import { Merriweather } from "next/font/google";
import "../globals.css";
import NextAuthSessionProvider from "@/Providers/NextAuthSessionProvider";
import ChatButton from "./component/ChatButton/ChatButton";
import { Toaster } from "sonner";
import Navbar from "./component/Navbar/Navbar";
import Footer from "./component/Footer/Footer";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Providers from "./component/Provider/Provider";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { notFound } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";

// ✅ Load Noto Sans with weights and styles
const notoSans = Merriweather({
	subsets: ["latin"],
	weight: ["300", "600", "800", "900"],
	style: ["normal"],
});

export const metadata = {
  title: "FitLife Your AI Powered Fitness Trainer",
  description: "FitLife Your AI Powered Fitness Trainer",
  manifest: "/manifest.json",
  themeColor: "#2563eb",
  icons: {
    icon: "/fitlife.jpg",
    apple: "/fitlife.jpg",
  },
};



const queryClient = new QueryClient();

export default async function RootLayout({ children, params }) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) notFound();

	return (
		<html lang={locale} data-theme="light">
			<NextAuthSessionProvider>
				{/* ✅ Use className for automatic font application */}
				<body className={`${notoSans.className} antialiased`}>
					<NextIntlClientProvider>
						<Providers>
							<Navbar />
							<SpeedInsights />
							<Toaster richColors closeButton />
							{children}
							<ChatButton />
							<LanguageSwitcher />
							<Footer />
						</Providers>
					</NextIntlClientProvider>
				</body>
			</NextAuthSessionProvider>
		</html>
	);
}
