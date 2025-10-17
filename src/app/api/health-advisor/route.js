import { NextResponse } from "next/server";

const OPENROUTER_API_KEY_HEALTH = process.env.OPENROUTER_API_KEY_HEALTH;

export async function POST(req) {
  try {
    const { userData } = await req.json();
    if(!userData) return NextResponse.json({ error:"Missing user data"},{status:400});

    // Validate numeric fields
    const requiredFields = ["sleepHours","sleepEfficiency","hrvScore","rpe","workoutDuration","RHRateDrop","cognitiveFatigue"];
    for(const field of requiredFields){
      if(userData[field]==null || isNaN(Number(userData[field]))) 
        return NextResponse.json({ error:`Invalid or missing field: ${field}`},{status:400});
    }

    const strainScore = Number(userData.rpe) * Number(userData.workoutDuration);

    const prompt = `
      You are an AI BIOMETRIC & PSYCHOLOGICAL ANALYST.
      Analyze these metrics:
      Sleep Hours: ${userData.sleepHours}
      Sleep Efficiency: ${userData.sleepEfficiency}%
      HRV Score: ${userData.hrvScore}
      Recovery HR Drop: ${userData.RHRateDrop}
      Strain Score: ${strainScore}
      Cognitive Fatigue: ${userData.cognitiveFatigue}/10

      Return JSON:
      {
        "riskLevel": "CRITICAL"|"HIGH"|"MODERATE"|"LOW",
        "physiologicalRisk": "...",
        "psychologicalRisk": "...",
        "aiSummary": "...",
        "actionProtocol":[
          {"category":"PHYSICAL","details":"...","metricImpact":"..."},
          {"category":"MENTAL","details":"...","metricImpact":"..."},
          {"category":"SLEEP","details":"...","metricImpact":"..."}
        ],
        "visualizationData":{
          "hrvHistory":[65,70,68,60,55,${userData.hrvScore}],
          "strainHistory":[10,20,30,25,${strainScore}],
          "recoveryHRDropHistory":[20,22,24,23,${userData.RHRateDrop}]
        }
      }
    `;

    const resp = await fetch("https://openrouter.ai/api/v1/chat/completions",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${OPENROUTER_API_KEY_HEALTH}`
      },
      body: JSON.stringify({
        model:"gpt-4o-mini",
        messages:[{role:"user", content:prompt}],
        response_format:{type:"json_object"}
      })
    });

    const data = await resp.json();
    const text = data?.choices?.[0]?.message?.content || "{}";

    try {
      const result = JSON.parse(text.replace(/[\n\r]+/g,""));
      return NextResponse.json(result);
    } catch(err) {
      console.warn("Invalid AI JSON", err);
      return NextResponse.json({ error:"AI response parsing failed"},{status:500});
    }

  } catch(error){
    console.error(error);
    return NextResponse.json({ error:"Internal server error: "+error.message},{status:500});
  }
}
