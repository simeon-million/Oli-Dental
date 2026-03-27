"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  LayoutDashboard,
  CalendarDays,
  LogOut,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  User,
  Mail,
  Phone,
  Stethoscope,
  RefreshCw,
  ChevronDown,
  Calendar,
  FileText,
  Activity,
  Menu,
  X,
} from "lucide-react";

/* ─── Types ────────────────────────────────────────── */
interface Booking {
  id: string;
  patient_name: string;
  patient_email: string;
  patient_phone: string | null;
  service: string;
  appointment_date: string;
  notes: string | null;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  created_at: string;
}

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    color: "bg-amber-100 text-amber-800 border-amber-200",
    icon: Clock,
    dot: "bg-amber-500",
  },
  confirmed: {
    label: "Confirmed",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: CheckCircle2,
    dot: "bg-blue-500",
  },
  completed: {
    label: "Completed",
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
    icon: CheckCircle2,
    dot: "bg-emerald-500",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: XCircle,
    dot: "bg-red-500",
  },
};

/* ─── Component ────────────────────────────────────── */
export default function StaffDashboard() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [staffEmail, setStaffEmail] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  /* ─── Auth check ─── */
  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/staff/login");
        return;
      }
      setStaffEmail(session.user.email || "");
      fetchBookings();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ─── Fetch bookings ─── */
  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/bookings${statusFilter !== "all" ? `?status=${statusFilter}` : ""}`
      );
      const data = await res.json();
      if (data.bookings) setBookings(data.bookings);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    setLoading(true);
    fetchBookings();
  }, [fetchBookings]);

  /* ─── Auto-refresh every 30s ─── */
  useEffect(() => {
    const interval = setInterval(() => {
      fetchBookings();
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchBookings]);

  /* ─── Update booking status ─── */
  async function updateStatus(id: string, status: string) {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: status as Booking["status"] } : b))
        );
        if (selectedBooking?.id === id) {
          setSelectedBooking((prev) =>
            prev ? { ...prev, status: status as Booking["status"] } : prev
          );
        }
      }
    } catch (err) {
      console.error("Failed to update:", err);
    } finally {
      setUpdatingId(null);
    }
  }

  /* ─── Logout ─── */
  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/staff/login");
  }

  /* ─── Refresh ─── */
  function handleRefresh() {
    setRefreshing(true);
    fetchBookings();
  }

  /* ─── Filter bookings ─── */
  const filtered = bookings.filter((b) => {
    const q = searchQuery.toLowerCase();
    return (
      b.patient_name.toLowerCase().includes(q) ||
      b.patient_email.toLowerCase().includes(q) ||
      b.service.toLowerCase().includes(q) ||
      (b.patient_phone && b.patient_phone.includes(q))
    );
  });

  /* ─── Stats ─── */
  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
  };

  function formatDate(dateStr: string) {
    return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* ════ SIDEBAR ════ */}
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-primary flex flex-col z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand */}
        <div className="px-6 py-7 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-primary"
              >
                <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
                <path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4" />
                <circle cx="20" cy="10" r="2" />
              </svg>
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-secondary block leading-none">
                Oli Dental
              </span>
              <span className="text-[0.6rem] font-semibold tracking-[0.2em] text-secondary/40 uppercase">
                Staff Portal
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-accent/15 text-accent font-semibold text-sm transition-all">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-secondary/50 hover:bg-white/5 hover:text-secondary font-medium text-sm transition-all">
            <CalendarDays className="w-5 h-5" />
            Bookings
          </button>
        </nav>

        {/* Staff info + logout */}
        <div className="px-4 py-5 border-t border-white/8">
          <div className="flex items-center gap-3 px-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center">
              <User className="w-4 h-4 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-secondary text-sm font-medium truncate">
                {staffEmail || "Staff"}
              </p>
              <p className="text-secondary/40 text-[0.65rem]">Staff member</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 font-medium text-sm transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ════ MAIN CONTENT ════ */}
      <main className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-secondary/80 backdrop-blur-xl border-b border-primary/8">
          <div className="flex items-center justify-between px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden w-10 h-10 rounded-xl bg-background flex items-center justify-center text-primary"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="font-serif text-2xl text-primary font-bold">
                  Dashboard
                </h1>
                <p className="text-foreground/50 text-sm">
                  Manage your clinic bookings
                </p>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              className={`w-10 h-10 rounded-xl bg-background border border-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-secondary transition-all ${
                refreshing ? "animate-spin" : ""
              }`}
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </header>

        <div className="px-6 lg:px-8 py-6 space-y-6">
          {/* ── Stats Cards ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Total Bookings",
                value: stats.total,
                icon: Activity,
                accent: "bg-primary/10 text-primary",
              },
              {
                title: "Pending",
                value: stats.pending,
                icon: Clock,
                accent: "bg-amber-100 text-amber-700",
              },
              {
                title: "Confirmed",
                value: stats.confirmed,
                icon: CheckCircle2,
                accent: "bg-blue-100 text-blue-700",
              },
              {
                title: "Completed",
                value: stats.completed,
                icon: CheckCircle2,
                accent: "bg-emerald-100 text-emerald-700",
              },
            ].map((stat) => (
              <div
                key={stat.title}
                className="bg-secondary rounded-2xl border border-primary/8 p-5 hover:shadow-lg hover:shadow-primary/5 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl ${stat.accent} flex items-center justify-center`}
                  >
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-foreground/50 text-sm mt-1">
                  {stat.title}
                </p>
              </div>
            ))}
          </div>

          {/* ── Filters ── */}
          <div className="bg-secondary rounded-2xl border border-primary/8 p-4">
            <div className="flex flex-col md:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, email, phone, or service..."
                  className="w-full bg-background border border-primary/10 rounded-xl pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                />
              </div>

              {/* Status filter */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-background border border-primary/10 rounded-xl pl-11 pr-10 py-3 text-sm text-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all appearance-none cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* ── Bookings List ── */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <RefreshCw className="w-8 h-8 text-accent animate-spin mx-auto mb-3" />
                <p className="text-foreground/50 text-sm">
                  Loading bookings...
                </p>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <CalendarDays className="w-12 h-12 text-foreground/15 mx-auto mb-3" />
                <p className="text-foreground/50 font-medium">
                  No bookings found
                </p>
                <p className="text-foreground/30 text-sm mt-1">
                  {searchQuery
                    ? "Try adjusting your search"
                    : "Bookings will appear here when patients submit them"}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((booking) => {
                const sc = STATUS_CONFIG[booking.status];
                const StatusIcon = sc.icon;
                const isUpdating = updatingId === booking.id;

                return (
                  <div
                    key={booking.id}
                    className="bg-secondary rounded-2xl border border-primary/8 overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all group"
                  >
                    <div
                      className="p-5 cursor-pointer"
                      onClick={() =>
                        setSelectedBooking(
                          selectedBooking?.id === booking.id
                            ? null
                            : booking
                        )
                      }
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        {/* Patient info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                              <User className="w-5 h-5 text-primary" />
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-semibold text-primary truncate">
                                {booking.patient_name}
                              </h3>
                              <p className="text-foreground/50 text-xs truncate">
                                {booking.patient_email}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Service & Date */}
                        <div className="flex items-center gap-4 md:gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <Stethoscope className="w-4 h-4 text-accent shrink-0" />
                            <span className="text-foreground/70 truncate max-w-[140px]">
                              {booking.service}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-accent shrink-0" />
                            <span className="text-foreground/70 whitespace-nowrap">
                              {formatDate(booking.appointment_date)}
                            </span>
                          </div>
                        </div>

                        {/* Status badge */}
                        <div className="flex items-center gap-3">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${sc.color}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                            {sc.label}
                          </span>
                          <span className="text-foreground/30 text-xs whitespace-nowrap hidden md:block">
                            {timeAgo(booking.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Expanded details */}
                    {selectedBooking?.id === booking.id && (
                      <div className="border-t border-primary/8 bg-background/50 p-5 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="w-4 h-4 text-accent" />
                              <span className="text-foreground/60">Email:</span>
                              <span className="text-primary font-medium">
                                {booking.patient_email}
                              </span>
                            </div>
                            {booking.patient_phone && (
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="w-4 h-4 text-accent" />
                                <span className="text-foreground/60">Phone:</span>
                                <span className="text-primary font-medium">
                                  {booking.patient_phone}
                                </span>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-sm">
                              <Stethoscope className="w-4 h-4 text-accent" />
                              <span className="text-foreground/60">Service:</span>
                              <span className="text-primary font-medium">
                                {booking.service}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="w-4 h-4 text-accent" />
                              <span className="text-foreground/60">Date:</span>
                              <span className="text-primary font-medium">
                                {formatDate(booking.appointment_date)}
                              </span>
                            </div>
                            {booking.notes && (
                              <div className="flex items-start gap-2 text-sm">
                                <FileText className="w-4 h-4 text-accent mt-0.5" />
                                <span className="text-foreground/60">Notes:</span>
                                <span className="text-primary">
                                  {booking.notes}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-primary/8">
                          {booking.status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  updateStatus(booking.id, "confirmed")
                                }
                                disabled={isUpdating}
                                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                                Confirm
                              </button>
                              <button
                                onClick={() =>
                                  updateStatus(booking.id, "cancelled")
                                }
                                disabled={isUpdating}
                                className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-200 transition-colors disabled:opacity-50"
                              >
                                <XCircle className="w-4 h-4" />
                                Cancel
                              </button>
                            </>
                          )}
                          {booking.status === "confirmed" && (
                            <>
                              <button
                                onClick={() =>
                                  updateStatus(booking.id, "completed")
                                }
                                disabled={isUpdating}
                                className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                                Mark Completed
                              </button>
                              <button
                                onClick={() =>
                                  updateStatus(booking.id, "cancelled")
                                }
                                disabled={isUpdating}
                                className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-200 transition-colors disabled:opacity-50"
                              >
                                <XCircle className="w-4 h-4" />
                                Cancel
                              </button>
                            </>
                          )}
                          {booking.status === "cancelled" && (
                            <button
                              onClick={() =>
                                updateStatus(booking.id, "pending")
                              }
                              disabled={isUpdating}
                              className="flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-amber-200 transition-colors disabled:opacity-50"
                            >
                              <AlertCircle className="w-4 h-4" />
                              Re-open
                            </button>
                          )}
                          {booking.status === "completed" && (
                            <span className="text-foreground/40 text-sm italic px-2">
                              This booking has been completed.
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
