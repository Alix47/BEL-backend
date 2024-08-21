-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "projectName" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "duration" INTEGER,
    "status" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "estimatedValue" DOUBLE PRECISION NOT NULL,
    "finalValue" DOUBLE PRECISION,
    "marketAvgPrice" DOUBLE PRECISION NOT NULL,
    "technologies" TEXT[],
    "category" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "taskName" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "assignedTo" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
