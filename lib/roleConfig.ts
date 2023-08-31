import { BsShieldCheck } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";
import { RiAccountPinCircleLine } from "react-icons/ri";


// eslint-disable-next-line no-unused-vars
enum ROLE {
  ADMIN = "ADMIN",
  USER = "USER",
  MENTOR = "MENTOR"
}

export const roleConfig = {
  [ROLE.ADMIN]: {
    color: "text-red-500",
    icon: BsShieldCheck,
  },
  [ROLE.USER]: {
    color: "text-dark-purple",
    icon: RiAccountPinCircleLine,
  },
  [ROLE.MENTOR]: {
    color: "text-dark-purple",
    icon: FaGraduationCap,
  }
};
