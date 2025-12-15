-- AlterTable
CREATE SEQUENCE bird_id_seq;
ALTER TABLE "Bird" ALTER COLUMN "id" SET DEFAULT nextval('bird_id_seq');
ALTER SEQUENCE bird_id_seq OWNED BY "Bird"."id";
