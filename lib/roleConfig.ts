// roleConfig.ts

import { BsShieldCheck } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { getUserRole } from './auth';

enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  MENTOR = "MENTOR"
}

export const roleConfig = {
  [Role.ADMIN]: {
    color: "text-red-500",
    icon: BsShieldCheck,
  },
  [Role.USER]: {
    color: "text-dark-purple",
    icon: RiAccountPinCircleLine,
  },
  [Role.MENTOR]: {
    color: "text-dark-purple",
    icon: FaGraduationCap,
  }
};
