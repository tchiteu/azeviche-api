-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "description" TEXT,
ALTER COLUMN "hourValue" DROP NOT NULL;
