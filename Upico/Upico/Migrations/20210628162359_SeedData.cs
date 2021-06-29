using Microsoft.EntityFrameworkCore.Migrations;

namespace Upico.Migrations
{
    public partial class SeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            //script for postgresql database server
            migrationBuilder.Sql(@"
                INSERT INTO public.""AspNetUsers"" VALUES ('e704e5db-1f49-468a-b901-08b8c2fd1a8b', NULL, NULL, NULL, 'Vinh', NULL, 'vinh', 'VINH', 'vinh@gmail.com', 'VINH@GMAIL.COM', false, 'AQAAAAEAACcQAAAAEL9xb+HZBdCepPlHvUJWMXxGNSFYhHDMpoGJJuWhcvofDuEo8A8aaxX04EsyD6XDvQ==', 'QXEAHYQMYC4EIRTS3TCC7DYU7X4BG6RV', 'c5785863-ea70-4191-b684-1f58198f3c45', NULL, false, false, NULL, true, 0);
                INSERT INTO public.""AspNetUsers"" VALUES ('d1f31323-580d-47a6-8dc3-35177511d895', NULL, NULL, NULL, 'Tam', NULL, 'tam', 'TAM', 'tiger@test.com', 'TIGER@TEST.COM', false, 'AQAAAAEAACcQAAAAEPMd/3De56sDvoIG/hicvPfBppHw6dNxDpP6IpImjzwrDEKwdygkVIZacamxS0gH4Q==', 'LK3XJZQGYTTZLG352VL5WKLIQPNFOLP2', '951d11a0-8b9a-4835-9a2b-73a00900cad3', NULL, false, false, NULL, true, 0);
                INSERT INTO public.""AspNetUsers"" VALUES ('45caef50-c947-4892-a950-96f75e7ab6c8', NULL, NULL, NULL, 'HuyBoDo', NULL, 'huy', 'HUY', 'huy@test.com', 'HUY@TEST.COM', false, 'AQAAAAEAACcQAAAAEAoDgYQhB3KWV1OeP77uFNBoIkAN+Ssk0fSlbksEVps0UGHdOd2rYNe+4WWAQhlcCg==', '6PGPIWWEJKJFNNKTDHFZKHFV7JK4NWZ2', 'f46e2088-13b8-421e-b9c4-4c8a01d22e24', NULL, false, false, NULL, true, 0);
                INSERT INTO public.""AspNetUsers"" VALUES ('e9bf0b6a-c538-4682-966e-1ff168d2b5c9', NULL, NULL, NULL, 'Nghia', NULL, 'nghiax', 'NGHIAX', 'nghia@test.com', 'NGHIA@TEST.COM', false, 'AQAAAAEAACcQAAAAEKdtkEC0jkz9UqrgQMxjw/5Dn6wIsURWSKBXwZbOQEjb3ZvfWNE1GehJG/Cuh5lERg==', 'FIODYR4CPKP3OESSTHWWPEWAWPRGPDSB', '49a18853-cb7e-4f1b-a199-836625e99745', NULL, false, false, NULL, true, 0);
                INSERT INTO public.""AspNetUsers"" VALUES ('0742fa4d-065a-493d-86a3-e80363f72a60', NULL, NULL, NULL, 'Admin', NULL, 'admin', 'ADMIN', 'admin@gmail.com', 'ADMIN@GMAIL.COM', false, 'AQAAAAEAACcQAAAAELrfaOUHTa0g5eKav/r3EW/22bIR8Q33askIu+IDCfb5txQ04Og30p+UHEJuyxmtHg==', 'PXPMK5YKH7NKFDC3ABXIS2UXTOL3WIPZ', '4afd4054-169c-41e4-bf3c-0a3dd586af02', NULL, false, false, NULL, true, 0);
            ");

            migrationBuilder.Sql(@"
                INSERT INTO public.""AspNetRoles"" VALUES ('8afc3650-2c6e-4478-a97e-b7a06979d754', 'Admin', 'ADMIN', 'eab834cb-1f43-4242-b7c5-acf9a56c82fd');
                INSERT INTO public.""AspNetRoles"" VALUES ('927a5950-2588-4e40-921b-ea3112eb116d', 'User', 'USER', '8b351457-c9e9-4813-bb2c-a0a6b4c4cd5c');
            ");

            migrationBuilder.Sql(@"
                INSERT INTO public.""AspNetUserRoles"" VALUES ('e704e5db-1f49-468a-b901-08b8c2fd1a8b', '927a5950-2588-4e40-921b-ea3112eb116d');
                INSERT INTO public.""AspNetUserRoles"" VALUES ('d1f31323-580d-47a6-8dc3-35177511d895', '927a5950-2588-4e40-921b-ea3112eb116d');
                INSERT INTO public.""AspNetUserRoles"" VALUES ('45caef50-c947-4892-a950-96f75e7ab6c8', '927a5950-2588-4e40-921b-ea3112eb116d');
                INSERT INTO public.""AspNetUserRoles"" VALUES ('e9bf0b6a-c538-4682-966e-1ff168d2b5c9', '927a5950-2588-4e40-921b-ea3112eb116d');
                INSERT INTO public.""AspNetUserRoles"" VALUES ('0742fa4d-065a-493d-86a3-e80363f72a60', '8afc3650-2c6e-4478-a97e-b7a06979d754');
            ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
