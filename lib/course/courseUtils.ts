import { Course, ProjectTemplate } from "@prisma/client";
import { prisma } from "../db/prisma";

export const cleanProgrammeID = (programmeID: string) => {
  if (!programmeID) return
  return programmeID.replace(/[0-9]/g, "");
}

export async function getCourseByProgrammeID(id: string) {
  const courseCode = cleanProgrammeID(id);

  console.log(`🔍 Looking up course with code: ${courseCode}`);
  const course = await prisma.course.findUnique({
    where: {
      courseCode
    },
    include: {
      projects: true
    }
  });

  if (!course) {
    console.log(`❌ Invalid course code: ${courseCode}`);
    return null;
  }

  console.log(`✅ Found course: ${course.name} (${course.courseCode})`);
  return course;
}

export async function generateProjectsForStudent(course: Course & { projects: ProjectTemplate[] }, studentId: string) {
  // Check if the course is valid
  if (!course) {
    console.log(`❌ Cannot generate projects. Invalid course code provided for student ID: ${studentId}`);
    return []; // Return an empty array or handle the error as needed
  }

  const projects = [];

  // Generate projects for the student
  for (const template of course.projects) {
    const project = await prisma.project.create({
      data: {
        name: template.name,
        templateId: template.id,
        studentId,
        prefix: template.prefix,
        status: "NOTSTARTED",
      }
    });
    projects.push(project);
  }

  return projects;
}