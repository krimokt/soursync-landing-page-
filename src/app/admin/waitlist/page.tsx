import { WaitlistTable } from "@/components/admin/waitlist-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Waitlist - SourSync Admin",
  description: "View and manage waitlist entries for SourSync.",
};

export default function AdminWaitlistPage() {
  return (
    <main className="relative bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-foreground mb-4">Waitlist Entries</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-center mb-12">View all users who have joined the waitlist.</p>
          <WaitlistTable />
        </div>
    </main>
  );
}




