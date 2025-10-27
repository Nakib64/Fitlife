"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const Users = () => {
  const t = useTranslations("dashboard.users");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [roleFilter, setRoleFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({ total: 0, totalPages: 0 });

  const roles = ["user", "premium-user", "controller", "coach", "admin"];

  const fetchUsers = async (
    pageNum = page,
    limitNum = limit,
    role = roleFilter,
    search = searchTerm
  ) => {
    setLoading(true);
    try {
      const query = new URLSearchParams({ page: pageNum, limit: limitNum });
      if (role) query.append("role", role);
      if (search) query.append("search", search);
      const res = await fetch(`/api/users?${query.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data.users || []);
      setPagination(data.pagination || { total: 0, totalPages: 0 });
    } catch (error) {
      console.error(error);
      toast.error(t("errorLoad"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, limit, roleFilter, searchTerm]);

  const toggleBan = async (email) => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/ban", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Failed");
      toast.success(data.isBanned ? t("banned") : t("unbanned"));
      setUsers((prev) =>
        prev.map((u) =>
          u.email === email ? { ...u, isBanned: data.isBanned } : u
        )
      );
    } catch (error) {
      console.error(error);
      toast.error(t("errorUpdate"));
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (email, role) => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/role", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Failed");
      toast.success(`${t("roleUpdated")} ${role}`);
      setUsers((prev) =>
        prev.map((u) => (u.email === email ? { ...u, role } : u))
      );
    } catch (error) {
      console.error(error);
      toast.error(t("errorRole"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header + Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl py-2 font-bold bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 bg-clip-text text-transparent">
          {t("title")}
        </h2>
        <div className="flex items-center gap-4 flex-wrap">
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            {t("totalUsers")}:{" "}
            <span className="font-semibold">{pagination.total}</span>
          </p>

          {/* Search Bar */}
          <Input
            type="text"
            placeholder={t("searchPlaceholder")}
            className="w-64 border border-lime-300 dark:text-white dark:border-lime-700 rounded-lg shadow-sm focus:border-lime-500 focus:ring-lime-200 transition"
            value={searchTerm}
            onChange={(e) => {
              setPage(1);
              setSearchTerm(e.target.value);
            }}
          />

          {/* Limit Selector */}
          <Select
            onValueChange={(val) => {
              setPage(1);
              setLimit(Number(val));
            }}
            value={String(limit)}
          >
            <SelectTrigger className="w-28 border border-lime-300 dark:border-lime-700 rounded-lg shadow-sm hover:border-lime-500 transition dark:text-gray-400">
              <SelectValue placeholder={t("limitLabel")} />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50].map((num) => (
                <SelectItem key={num} value={String(num)}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Role Filter */}
          <Select
            onValueChange={(val) => {
              setPage(1);
              setRoleFilter(val === "all" ? "" : val);
            }}
            value={roleFilter || "all"}
          >
            <SelectTrigger className="w-36 border border-lime-300 dark:text-gray-400 dark:border-lime-700 rounded-lg shadow-sm hover:border-lime-500 transition">
              <SelectValue placeholder={t("filterRole")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("roles.allRoles")}</SelectItem>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {t(`roles.${role}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl shadow-lg border border-lime-200 dark:border-lime-700 bg-white dark:bg-gray-950 transition-all">
        <Table className="table-auto">
          <TableHeader className="bg-gradient-to-r from-lime-100 to-lime-200 dark:from-lime-900 dark:to-lime-800">
            <TableRow>
              <TableHead className="text-left">{t("name")}</TableHead>
              <TableHead className="text-left">{t("email")}</TableHead>
              <TableHead className="text-left">{t("role")}</TableHead>
              <TableHead className="text-left">{t("status")}</TableHead>
              <TableHead className="text-center">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: limit }).map((_, i) => (
                  <TableRow key={i} className="animate-pulse">
                    <TableCell>
                      <Skeleton className="h-4 w-28" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-40" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-28" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20 mx-auto" />
                    </TableCell>
                  </TableRow>
                ))
              : users.map((user) => (
                  <TableRow key={user._id} className={"text-gray-600 dark:text-gray-400"}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      {user.role === "admin" ? (
                        <Badge className="capitalize bg-lime-500 text-white">
                          {user.role}
                        </Badge>
                      ) : (
                        <Select
                          onValueChange={(val) => updateRole(user.email, val)}
                          value={user.role}
                        >
                          <SelectTrigger className="w-36 border border-lime-300 dark:border-lime-700 rounded-lg shadow-sm hover:border-lime-500 transition">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          user.isBanned
                            ? "bg-red-500 text-white"
                            : "bg-lime-500 text-white"
                        }
                      >
                        {user.isBanned ? t("banned") : t("active")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {user.role !== "admin" && (
                        <Button
                          size="sm"
                          variant={user.isBanned ? "outline" : "default"}
                          className={`transition-transform hover:scale-105 ${
                            user.isBanned
                              ? "border-lime-500 text-lime-500 hover:bg-lime-50"
                              : "bg-lime-600 text-white hover:bg-lime-700"
                          }`}
                          onClick={() => toggleBan(user.email)}
                        >
                          {user.isBanned ? t("unban") : t("ban")}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
          <Button
            size="sm"
            variant="outline"
            className="border-lime-400 text-lime-600 hover:bg-lime-100"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            {t("prev")}
          </Button>
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
            (num) => (
              <Button
                key={num}
                size="sm"
                variant={page === num ? "default" : "outline"}
                className={`border-lime-400 ${
                  page === num
                    ? "bg-lime-600 text-white"
                    : "text-lime-600 hover:bg-lime-100"
                } transition-transform hover:scale-105`}
                onClick={() => setPage(num)}
              >
                {num}
              </Button>
            )
          )}
          <Button
            size="sm"
            variant="outline"
            className="border-lime-400 text-lime-600 hover:bg-lime-100"
            disabled={page >= pagination.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            {t("next")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Users;
