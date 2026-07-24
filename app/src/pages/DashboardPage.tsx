import ResumeSidebar from "../components/ResumeSidebar";
import AIChatHelper from "../components/AIChatHelper";
import DashboardHeader from "../components/DashboardHeader";

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <DashboardHeader />

      <div className="grid grid-cols-[minmax(230px,0.76fr)_minmax(360px,1.35fr)] max-lg:grid-cols-[minmax(220px,0.7fr)_minmax(340px,1.3fr)] max-sm:grid-cols-1 gap-[17px] max-w-[1440px] mx-auto py-[27px] px-4 sm:px-[18px] md:px-[54px] items-start">
        <ResumeSidebar />
        <AIChatHelper onChange={(data: any) => console.log(data)} />
      </div>
    </div>
  );
}
