/*
  Warnings:

  - You are about to drop the column `marketAvgPrice` on the `Project` table. All the data in the column will be lost.
  - Made the column `description` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "marketAvgPrice";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "description" SET NOT NULL;
