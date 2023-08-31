import { AiOutlineBarChart } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import { FaFileInvoiceDollar, } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { PiStudentBold } from "react-icons/pi";

export const MAIN_MENU = [
  { title: "Dashboard", href: "/dashboard", icon: BiSolidDashboard, premium: false, spacing: true },
  { title: "Your Students", href: "/students", icon: PiStudentBold, premium: false, spacing: true },
  { title: "Student Stats", href: "/stats", icon: AiOutlineBarChart, premium: false, spacing: true },
  { title: "Invoices", href: "/invoices", icon: FaFileInvoiceDollar, premium: false, spacing: true },
];

export const BOTTOM_MENU = [
  { title: "Settings", href: "/settings", icon: FiSettings },
];