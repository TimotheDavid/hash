import {MigrationInterface, QueryRunner} from "typeorm";

export class all1605353080926 implements MigrationInterface {
    name = 'all1605353080926'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "exercice" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "exercice_id" integer NOT NULL, CONSTRAINT "PK_b084e90a604d8b0560393b99f56" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "homework" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, "show_date" date NOT NULL, CONSTRAINT "PK_90dbf463ef94040ed137c4fd38d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subject" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_12eee115462e38d62e5455fc054" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classroom" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_729f896c8b7b96ddf10c341e6ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "level" ("id" SERIAL NOT NULL, "label" character varying NOT NULL, CONSTRAINT "PK_d3f1a7a6f09f1c3144bacdc6bcc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "message" character varying NOT NULL, "message_subject" character varying NOT NULL, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "label" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "homework_exercices_exercice" ("homeworkId" integer NOT NULL, "exerciceId" integer NOT NULL, CONSTRAINT "PK_930285307f454d491c832190f2e" PRIMARY KEY ("homeworkId", "exerciceId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_509fcb08f7b282b3a5472c348c" ON "homework_exercices_exercice" ("homeworkId") `);
        await queryRunner.query(`CREATE INDEX "IDX_caf61442c586b8e570146ea1a7" ON "homework_exercices_exercice" ("exerciceId") `);
        await queryRunner.query(`CREATE TABLE "classroom_users_user" ("classroomId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_8aa89654d0fc64b479571d0dedd" PRIMARY KEY ("classroomId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_249486def37333db0b8525ae19" ON "classroom_users_user" ("classroomId") `);
        await queryRunner.query(`CREATE INDEX "IDX_34ba407c4ff0b511c38a196953" ON "classroom_users_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "level_users_user" ("levelId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_460e9ed878f65986bff858e896b" PRIMARY KEY ("levelId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ec21863ee14d2b0177594745ad" ON "level_users_user" ("levelId") `);
        await queryRunner.query(`CREATE INDEX "IDX_658735f292d635abd26d40161e" ON "level_users_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "message_teacher_user" ("messageId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_a9bf8bce2ff3dded2f6ef2b29a6" PRIMARY KEY ("messageId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0ad231f822ba262aed6ec32cd7" ON "message_teacher_user" ("messageId") `);
        await queryRunner.query(`CREATE INDEX "IDX_13eea43516bcf9107980b5ec19" ON "message_teacher_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "message_student_user" ("messageId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_8cb9837fb73789c9d376a82a274" PRIMARY KEY ("messageId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f55ff5415e9f7cd4441d0d294a" ON "message_student_user" ("messageId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ad241edebe5c6d848f9df2fec2" ON "message_student_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "role_users_user" ("roleId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_46403d6ce64cde119287c876ca3" PRIMARY KEY ("roleId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ed6edac7184b013d4bd58d60e5" ON "role_users_user" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a88fcb405b56bf2e2646e9d479" ON "role_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "surname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "score" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "homework_exercices_exercice" ADD CONSTRAINT "FK_509fcb08f7b282b3a5472c348cf" FOREIGN KEY ("homeworkId") REFERENCES "homework"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "homework_exercices_exercice" ADD CONSTRAINT "FK_caf61442c586b8e570146ea1a7e" FOREIGN KEY ("exerciceId") REFERENCES "exercice"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classroom_users_user" ADD CONSTRAINT "FK_249486def37333db0b8525ae19c" FOREIGN KEY ("classroomId") REFERENCES "classroom"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classroom_users_user" ADD CONSTRAINT "FK_34ba407c4ff0b511c38a196953a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "level_users_user" ADD CONSTRAINT "FK_ec21863ee14d2b0177594745ad4" FOREIGN KEY ("levelId") REFERENCES "level"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "level_users_user" ADD CONSTRAINT "FK_658735f292d635abd26d40161e5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message_teacher_user" ADD CONSTRAINT "FK_0ad231f822ba262aed6ec32cd72" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message_teacher_user" ADD CONSTRAINT "FK_13eea43516bcf9107980b5ec192" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message_student_user" ADD CONSTRAINT "FK_f55ff5415e9f7cd4441d0d294a0" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message_student_user" ADD CONSTRAINT "FK_ad241edebe5c6d848f9df2fec2d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_users_user" ADD CONSTRAINT "FK_ed6edac7184b013d4bd58d60e54" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_users_user" ADD CONSTRAINT "FK_a88fcb405b56bf2e2646e9d4797" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_users_user" DROP CONSTRAINT "FK_a88fcb405b56bf2e2646e9d4797"`);
        await queryRunner.query(`ALTER TABLE "role_users_user" DROP CONSTRAINT "FK_ed6edac7184b013d4bd58d60e54"`);
        await queryRunner.query(`ALTER TABLE "message_student_user" DROP CONSTRAINT "FK_ad241edebe5c6d848f9df2fec2d"`);
        await queryRunner.query(`ALTER TABLE "message_student_user" DROP CONSTRAINT "FK_f55ff5415e9f7cd4441d0d294a0"`);
        await queryRunner.query(`ALTER TABLE "message_teacher_user" DROP CONSTRAINT "FK_13eea43516bcf9107980b5ec192"`);
        await queryRunner.query(`ALTER TABLE "message_teacher_user" DROP CONSTRAINT "FK_0ad231f822ba262aed6ec32cd72"`);
        await queryRunner.query(`ALTER TABLE "level_users_user" DROP CONSTRAINT "FK_658735f292d635abd26d40161e5"`);
        await queryRunner.query(`ALTER TABLE "level_users_user" DROP CONSTRAINT "FK_ec21863ee14d2b0177594745ad4"`);
        await queryRunner.query(`ALTER TABLE "classroom_users_user" DROP CONSTRAINT "FK_34ba407c4ff0b511c38a196953a"`);
        await queryRunner.query(`ALTER TABLE "classroom_users_user" DROP CONSTRAINT "FK_249486def37333db0b8525ae19c"`);
        await queryRunner.query(`ALTER TABLE "homework_exercices_exercice" DROP CONSTRAINT "FK_caf61442c586b8e570146ea1a7e"`);
        await queryRunner.query(`ALTER TABLE "homework_exercices_exercice" DROP CONSTRAINT "FK_509fcb08f7b282b3a5472c348cf"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "score"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "surname"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "age" integer NOT NULL`);
        await queryRunner.query(`DROP INDEX "IDX_a88fcb405b56bf2e2646e9d479"`);
        await queryRunner.query(`DROP INDEX "IDX_ed6edac7184b013d4bd58d60e5"`);
        await queryRunner.query(`DROP TABLE "role_users_user"`);
        await queryRunner.query(`DROP INDEX "IDX_ad241edebe5c6d848f9df2fec2"`);
        await queryRunner.query(`DROP INDEX "IDX_f55ff5415e9f7cd4441d0d294a"`);
        await queryRunner.query(`DROP TABLE "message_student_user"`);
        await queryRunner.query(`DROP INDEX "IDX_13eea43516bcf9107980b5ec19"`);
        await queryRunner.query(`DROP INDEX "IDX_0ad231f822ba262aed6ec32cd7"`);
        await queryRunner.query(`DROP TABLE "message_teacher_user"`);
        await queryRunner.query(`DROP INDEX "IDX_658735f292d635abd26d40161e"`);
        await queryRunner.query(`DROP INDEX "IDX_ec21863ee14d2b0177594745ad"`);
        await queryRunner.query(`DROP TABLE "level_users_user"`);
        await queryRunner.query(`DROP INDEX "IDX_34ba407c4ff0b511c38a196953"`);
        await queryRunner.query(`DROP INDEX "IDX_249486def37333db0b8525ae19"`);
        await queryRunner.query(`DROP TABLE "classroom_users_user"`);
        await queryRunner.query(`DROP INDEX "IDX_caf61442c586b8e570146ea1a7"`);
        await queryRunner.query(`DROP INDEX "IDX_509fcb08f7b282b3a5472c348c"`);
        await queryRunner.query(`DROP TABLE "homework_exercices_exercice"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "level"`);
        await queryRunner.query(`DROP TABLE "classroom"`);
        await queryRunner.query(`DROP TABLE "subject"`);
        await queryRunner.query(`DROP TABLE "homework"`);
        await queryRunner.query(`DROP TABLE "exercice"`);
    }

}
