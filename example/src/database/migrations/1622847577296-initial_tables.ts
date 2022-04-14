import {MigrationInterface, QueryRunner} from "typeorm";

export class initialTables1622847577296 implements MigrationInterface {
    name = 'initialTables1622847577296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "departments" ("id" SERIAL NOT NULL, "name" text NOT NULL, "code" character varying(25), "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8681da666ad9699d568b3e91064" UNIQUE ("name"), CONSTRAINT "PK_839517a681a86bb84cbcc6a1e9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cities" ("id" SERIAL NOT NULL, "name" text NOT NULL, "code" character varying(25), "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "departmentId" integer, CONSTRAINT "UQ_a0ae8d83b7d32359578c486e7f6" UNIQUE ("name"), CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "identification_types" ("id" SERIAL NOT NULL, "name" character varying(250) NOT NULL, "abbreviation" character varying(25) NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_5015ee586a3d770e4aae2821af1" UNIQUE ("name"), CONSTRAINT "UQ_0a1d6bd8bf0f9d5c89346122339" UNIQUE ("abbreviation"), CONSTRAINT "PK_aea4812e4ea3f3a611961e1a87f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contacts" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "lastname" character varying(150) NOT NULL, "identification_number" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying, "department_id" numeric NOT NULL, "city_id" numeric NOT NULL, "direction" text NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "identification_type_id" integer NOT NULL, CONSTRAINT "UQ_6574fd0bb03ff667fedada73436" UNIQUE ("identification_number"), CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email"), CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permissions" ("id" SERIAL NOT NULL, "name" character varying(25) NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_48ce552495d14eae9b187bb6716" UNIQUE ("name"), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying(25) NOT NULL, "description" text NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "lastname" character varying(150) NOT NULL, "username" character varying(40) NOT NULL, "email" character varying NOT NULL, "phone" character varying, "password" character varying NOT NULL, "photo_url" text, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tokens" ("id" SERIAL NOT NULL, "token" text NOT NULL, "status" character varying(20) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "UQ_6a8ca5961656d13c16c04079dd3" UNIQUE ("token"), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "person_types" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "abbreviation" character varying(25), "description" text, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_6daf2f7cf1eb3eac141173db9f4" UNIQUE ("name"), CONSTRAINT "UQ_2c1122b36c519266abf2d2abef1" UNIQUE ("abbreviation"), CONSTRAINT "PK_8aba3a0e5f072264285099a82fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mining_titles" ("id" SERIAL NOT NULL, "title" text NOT NULL, "title_url" text NOT NULL, "rucom" text NOT NULL, "rucom_url" text NOT NULL, "gold_type_id" numeric NOT NULL, "department_id" numeric NOT NULL, "city_id" numeric NOT NULL, "direction" text NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "supplierId" integer, CONSTRAINT "PK_0078b00f2253039bb24af59a9fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "supplier_types" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "abbreviation" character varying(25), "description" text, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_404d6a6acdcb384b45d64221c9c" UNIQUE ("name"), CONSTRAINT "UQ_d7af706763d298b1aa40a34b14d" UNIQUE ("abbreviation"), CONSTRAINT "PK_2a20dd7dd5a7410dfccf9533e67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "suppliers" ("id" SERIAL NOT NULL, "fullname" character varying(250) NOT NULL, "identification_number" character varying NOT NULL, "identification_url" text NOT NULL, "code" text, "photo_url" text, "rut" text, "rut_url" text, "judicial_history_url" text, "chamber_commerce_url" text, "office_department_id" numeric, "office_city_id" numeric, "office_direction" text, "direction" text, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "identification_type_id" integer NOT NULL, "gold_type_id" integer NOT NULL, "supplier_type_id" integer NOT NULL, "person_type_id" integer NOT NULL, "department_id" integer NOT NULL, "city_id" integer NOT NULL, CONSTRAINT "UQ_b3c1890cf3e3a104a9b7fbba8b6" UNIQUE ("identification_number"), CONSTRAINT "PK_b70ac51766a9e3144f778cfe81e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "gold_types" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "abbreviation" character varying(25), "description" text NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_efbc2b4a88a3357d255109dbdb0" UNIQUE ("name"), CONSTRAINT "UQ_2565f0abc804290cc4336ce1638" UNIQUE ("abbreviation"), CONSTRAINT "PK_7f94a9f56ebfb0620b4c4ca324b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "status_bar" ("id" SERIAL NOT NULL, "name" character varying(250) NOT NULL, "abbreviation" character varying(25) NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4c042d8bcf78d3df92afdae0096" UNIQUE ("name"), CONSTRAINT "UQ_e12c71b8c48c8c32a42e03dcfab" UNIQUE ("abbreviation"), CONSTRAINT "PK_63d5559270e4533fa0e72f848db" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission_roles" ("permissionsId" integer NOT NULL, "rolesId" integer NOT NULL, CONSTRAINT "PK_562825b7c054eba4e97668c1929" PRIMARY KEY ("permissionsId", "rolesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cbbe897c2c9aa3a4779255d2ac" ON "permission_roles" ("permissionsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bfb77f3015b756d90a7f9067d7" ON "permission_roles" ("rolesId") `);
        await queryRunner.query(`CREATE TABLE "role_users" ("rolesId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_6bad84c6fa809b4dd0568a2963c" PRIMARY KEY ("rolesId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ef26f2b8bc19c086fea006a0a3" ON "role_users" ("rolesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c0d9088505044369fb7e7cde1e" ON "role_users" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "role_permissions" ("rolesId" integer NOT NULL, "permissionsId" integer NOT NULL, CONSTRAINT "PK_7931614007a93423204b4b73240" PRIMARY KEY ("rolesId", "permissionsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0cb93c5877d37e954e2aa59e52" ON "role_permissions" ("rolesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d422dabc78ff74a8dab6583da0" ON "role_permissions" ("permissionsId") `);
        await queryRunner.query(`CREATE TABLE "user_roles" ("usersId" integer NOT NULL, "rolesId" integer NOT NULL, CONSTRAINT "PK_38ffcfb865fc628fa337d9a0d4f" PRIMARY KEY ("usersId", "rolesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_99b019339f52c63ae615358738" ON "user_roles" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_13380e7efec83468d73fc37938" ON "user_roles" ("rolesId") `);
        await queryRunner.query(`ALTER TABLE "cities" ADD CONSTRAINT "FK_49cb607941062b15a336a18c887" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_118bc4afb085a5f7ce6dbdfc8cb" FOREIGN KEY ("identification_type_id") REFERENCES "identification_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mining_titles" ADD CONSTRAINT "FK_fed21a47b83fd3d945160eedea9" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "suppliers" ADD CONSTRAINT "FK_dbc08e58b1f5a2c06c05e6a0de4" FOREIGN KEY ("identification_type_id") REFERENCES "identification_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "suppliers" ADD CONSTRAINT "FK_8f00f10688a046bcef3509ca89f" FOREIGN KEY ("gold_type_id") REFERENCES "gold_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "suppliers" ADD CONSTRAINT "FK_2b1258636d8891f1cd36a63ba03" FOREIGN KEY ("supplier_type_id") REFERENCES "supplier_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "suppliers" ADD CONSTRAINT "FK_3f3fa969a1f09a2483987a48bf6" FOREIGN KEY ("person_type_id") REFERENCES "person_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "suppliers" ADD CONSTRAINT "FK_bcbafd45111da8b78dde97c541a" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "suppliers" ADD CONSTRAINT "FK_755607e8ca43154637c37f41a38" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission_roles" ADD CONSTRAINT "FK_cbbe897c2c9aa3a4779255d2aca" FOREIGN KEY ("permissionsId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission_roles" ADD CONSTRAINT "FK_bfb77f3015b756d90a7f9067d7d" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_users" ADD CONSTRAINT "FK_ef26f2b8bc19c086fea006a0a3e" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_users" ADD CONSTRAINT "FK_c0d9088505044369fb7e7cde1e0" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_0cb93c5877d37e954e2aa59e52c" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_d422dabc78ff74a8dab6583da02" FOREIGN KEY ("permissionsId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_99b019339f52c63ae6153587380" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_13380e7efec83468d73fc37938e" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_13380e7efec83468d73fc37938e"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_99b019339f52c63ae6153587380"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_d422dabc78ff74a8dab6583da02"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_0cb93c5877d37e954e2aa59e52c"`);
        await queryRunner.query(`ALTER TABLE "role_users" DROP CONSTRAINT "FK_c0d9088505044369fb7e7cde1e0"`);
        await queryRunner.query(`ALTER TABLE "role_users" DROP CONSTRAINT "FK_ef26f2b8bc19c086fea006a0a3e"`);
        await queryRunner.query(`ALTER TABLE "permission_roles" DROP CONSTRAINT "FK_bfb77f3015b756d90a7f9067d7d"`);
        await queryRunner.query(`ALTER TABLE "permission_roles" DROP CONSTRAINT "FK_cbbe897c2c9aa3a4779255d2aca"`);
        await queryRunner.query(`ALTER TABLE "suppliers" DROP CONSTRAINT "FK_755607e8ca43154637c37f41a38"`);
        await queryRunner.query(`ALTER TABLE "suppliers" DROP CONSTRAINT "FK_bcbafd45111da8b78dde97c541a"`);
        await queryRunner.query(`ALTER TABLE "suppliers" DROP CONSTRAINT "FK_3f3fa969a1f09a2483987a48bf6"`);
        await queryRunner.query(`ALTER TABLE "suppliers" DROP CONSTRAINT "FK_2b1258636d8891f1cd36a63ba03"`);
        await queryRunner.query(`ALTER TABLE "suppliers" DROP CONSTRAINT "FK_8f00f10688a046bcef3509ca89f"`);
        await queryRunner.query(`ALTER TABLE "suppliers" DROP CONSTRAINT "FK_dbc08e58b1f5a2c06c05e6a0de4"`);
        await queryRunner.query(`ALTER TABLE "mining_titles" DROP CONSTRAINT "FK_fed21a47b83fd3d945160eedea9"`);
        await queryRunner.query(`ALTER TABLE "tokens" DROP CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_118bc4afb085a5f7ce6dbdfc8cb"`);
        await queryRunner.query(`ALTER TABLE "cities" DROP CONSTRAINT "FK_49cb607941062b15a336a18c887"`);
        await queryRunner.query(`DROP INDEX "IDX_13380e7efec83468d73fc37938"`);
        await queryRunner.query(`DROP INDEX "IDX_99b019339f52c63ae615358738"`);
        await queryRunner.query(`DROP TABLE "user_roles"`);
        await queryRunner.query(`DROP INDEX "IDX_d422dabc78ff74a8dab6583da0"`);
        await queryRunner.query(`DROP INDEX "IDX_0cb93c5877d37e954e2aa59e52"`);
        await queryRunner.query(`DROP TABLE "role_permissions"`);
        await queryRunner.query(`DROP INDEX "IDX_c0d9088505044369fb7e7cde1e"`);
        await queryRunner.query(`DROP INDEX "IDX_ef26f2b8bc19c086fea006a0a3"`);
        await queryRunner.query(`DROP TABLE "role_users"`);
        await queryRunner.query(`DROP INDEX "IDX_bfb77f3015b756d90a7f9067d7"`);
        await queryRunner.query(`DROP INDEX "IDX_cbbe897c2c9aa3a4779255d2ac"`);
        await queryRunner.query(`DROP TABLE "permission_roles"`);
        await queryRunner.query(`DROP TABLE "status_bar"`);
        await queryRunner.query(`DROP TABLE "gold_types"`);
        await queryRunner.query(`DROP TABLE "suppliers"`);
        await queryRunner.query(`DROP TABLE "supplier_types"`);
        await queryRunner.query(`DROP TABLE "mining_titles"`);
        await queryRunner.query(`DROP TABLE "person_types"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`DROP TABLE "identification_types"`);
        await queryRunner.query(`DROP TABLE "cities"`);
        await queryRunner.query(`DROP TABLE "departments"`);
    }

}
