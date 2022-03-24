/*
  Warnings:

  - A unique constraint covering the columns `[image]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Artist_image_key" ON "Artist"("image");
