-- CreateTable
CREATE TABLE "Straffepils" (
    "id" SERIAL NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "giverId" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Straffepils_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Straffepils" ADD CONSTRAINT "Straffepils_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Straffepils" ADD CONSTRAINT "Straffepils_giverId_fkey" FOREIGN KEY ("giverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
