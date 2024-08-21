/*
  Warnings:

  - You are about to drop the column `finalValue` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "finalValue",
DROP COLUMN "priority",
ADD COLUMN     "teamMembers" TEXT[],
ALTER COLUMN "estimatedValue" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "endDate",
DROP COLUMN "startDate";
