import { MigrationInterface, QueryRunner } from 'typeorm';

type DelegadoSeed = {
  numeroDocumento: string;
  nombreCompleto: string;
};

export class SeedDelegadosAsamblea1742911000000 implements MigrationInterface {
  name = 'SeedDelegadosAsamblea1742911000000';

  private readonly delegados: DelegadoSeed[] = [
    { nombreCompleto: 'ACEVEDO CARDONA SEBASTIAN', numeroDocumento: '1088016059' },
    { nombreCompleto: 'AGUDELO ROJAS PETER BRANDON', numeroDocumento: '1088356842' },
    { nombreCompleto: 'AGUDELO TORRES JORGE LUIS', numeroDocumento: '1004734050' },
    { nombreCompleto: 'ALFARO AMORTEGUI JAVIER', numeroDocumento: '11441755' },
    { nombreCompleto: 'ALVAREZ GRUESO JHON ALEXANDER', numeroDocumento: '1088244707' },
    { nombreCompleto: 'ALZATE ZAPATA RONALD IGNACIO', numeroDocumento: '14571473' },
    { nombreCompleto: 'ANDICA ARICAPA RUBEN DARIO', numeroDocumento: '94461097' },
    { nombreCompleto: 'ARIAS OSPINA SERGIO ALEJANDRO', numeroDocumento: '1088273067' },
    { nombreCompleto: 'ARICAPA RIOS JHONATAN ALEXANDER', numeroDocumento: '1090338356' },
    { nombreCompleto: 'BEDOYA SANCHEZ ADRIAN STIVEN', numeroDocumento: '1225089089' },
    { nombreCompleto: 'BERMUDEZ VELEZ JOHN ALEXANDER', numeroDocumento: '1087494142' },
    { nombreCompleto: 'BONILLA TOVAR SANTIAGO', numeroDocumento: '1004699245' },
    { nombreCompleto: 'BUITRAGO BETANCURT JHON BYRON', numeroDocumento: '1004716364' },
    { nombreCompleto: 'CANO ESPINAL SERAFIN', numeroDocumento: '18605130' },
    { nombreCompleto: 'CARDONA MARIN JULIAN ALBERTO', numeroDocumento: '1058912317' },
    { nombreCompleto: 'COLORADO FRANCO JAIRO ALONSO', numeroDocumento: '9872088' },
    { nombreCompleto: 'CORREA OBANDO JHON JAIRO', numeroDocumento: '18604266' },
    { nombreCompleto: 'DAVILA VILLA HECTOR FABIAN', numeroDocumento: '14690074' },
    { nombreCompleto: 'DIAZ VERGARA YESID', numeroDocumento: '1109299930' },
    { nombreCompleto: 'DURAN PELAEZ VICTOR HUGO', numeroDocumento: '1088249084' },
    { nombreCompleto: 'ESCOBAR BETANCUR HUGO ANTONIO', numeroDocumento: '1054552145' },
    { nombreCompleto: 'ESPITIA MARTINEZ EDWIN JAVIER', numeroDocumento: '1088285705' },
    { nombreCompleto: 'FLOREZ BERRIO DIEGO ALEXANDER', numeroDocumento: '18523269' },
    { nombreCompleto: 'GALVIS JORDAN FRAN ALEXIS', numeroDocumento: '1088279012' },
    { nombreCompleto: 'GIRALDO ARIAS CARLOS ALBEIRO', numeroDocumento: '18507034' },
    { nombreCompleto: 'GIRALDO CERQUERA MILTON', numeroDocumento: '1061372979' },
    { nombreCompleto: 'GOMEZ SEPULVEDA MAURICIO', numeroDocumento: '1004680340' },
    { nombreCompleto: 'GONZALEZ SANCHEZ JUAN CARLOS', numeroDocumento: '1054918671' },
    { nombreCompleto: 'GUEVARA TUSARMA NELSON ENRIQUE', numeroDocumento: '4431629' },
    { nombreCompleto: 'HERNANDEZ MARTINEZ CARLOS ALBERTO', numeroDocumento: '10021476' },
    { nombreCompleto: 'IDARRAGA RINCON WILMAR', numeroDocumento: '71194646' },
    { nombreCompleto: 'JARAMILLO CARDONA JHON FREDY', numeroDocumento: '1093229515' },
    { nombreCompleto: 'LADINO GAÑAN ESNEIDER', numeroDocumento: '1090335640' },
    { nombreCompleto: 'LADINO IBARRA JUAN DAVID', numeroDocumento: '1088321698' },
    { nombreCompleto: 'LADINO PINTO EDWIN', numeroDocumento: '1090334090' },
    { nombreCompleto: 'LARGO RIOS LIBANIEL EMILSON', numeroDocumento: '4416312' },
    { nombreCompleto: 'LENGUA GAÑAN WILSON DE JESUS', numeroDocumento: '1087994857' },
    { nombreCompleto: 'LIDUEÑA TORRES FABIO', numeroDocumento: '19767490' },
    { nombreCompleto: 'LOAIZA RIOS JOSE ARLEY', numeroDocumento: '16139356' },
    { nombreCompleto: 'LOPEZ AGUDELO JORGE IVAN', numeroDocumento: '1088015671' },
    { nombreCompleto: 'LOPEZ CASTAÑEDA WILMER DANIEL', numeroDocumento: '1122136670' },
    { nombreCompleto: 'LOPEZ MONTES JUAN PABLO', numeroDocumento: '9873467' },
    { nombreCompleto: 'LOPEZ TINOCO JORGE ANDRES', numeroDocumento: '1088304625' },
    { nombreCompleto: 'LOTERO QUICENO JOSE HELIBERTO', numeroDocumento: '18612346' },
    { nombreCompleto: 'MARIN ACOSTA JULIAN ANDRES', numeroDocumento: '1126592057' },
    { nombreCompleto: 'MARIN LONDOÑO JOHN HECTOR', numeroDocumento: '1004683089' },
    { nombreCompleto: 'MARQUEZ LOPEZ DAYHANNA', numeroDocumento: '1088276313' },
    { nombreCompleto: 'MARTINEZ ACEVEDO JHON ALEXANDER', numeroDocumento: '1059695262' },
    { nombreCompleto: 'MARTINEZ VELASCO ALEX FERNANDO', numeroDocumento: '94462739' },
    { nombreCompleto: 'MORALES DIAZ JHONATAN', numeroDocumento: '1004752960' },
    { nombreCompleto: 'MORENO LADINO JUAN PABLO', numeroDocumento: '1004801461' },
    { nombreCompleto: 'NORAMBIL RAMIREZ RUBEN', numeroDocumento: '1097723292' },
    { nombreCompleto: 'OCHOA LOAIZA GIOVANNY', numeroDocumento: '18515923' },
    { nombreCompleto: 'ORTIZ OROZCO HECTOR DE JESUS', numeroDocumento: '9893114' },
    { nombreCompleto: 'PARAMO ARIAS ANDRES FELIPE', numeroDocumento: '9868924' },
    { nombreCompleto: 'PEÑATES MARTINEZ ALVARO ENRIQUE', numeroDocumento: '1112760940' },
    { nombreCompleto: 'PEREZ MURAYARI HANS ALEXIS', numeroDocumento: '1088329121' },
    { nombreCompleto: 'PETREL GRAJALES VICTOR ALFONSO', numeroDocumento: '1088005926' },
    { nombreCompleto: 'PULGARIN GUTIERREZ JHON MAURICIO', numeroDocumento: '1088249441' },
    { nombreCompleto: 'RAMIREZ OSORIO JOSE EDWIN', numeroDocumento: '18519117' },
    { nombreCompleto: 'RESTREPO MEJIA CRISTHIAN ANDRES', numeroDocumento: '1088004368' },
    { nombreCompleto: 'RESTREPO ZAPATA YEISON ALBERTO', numeroDocumento: '1112784894' },
    { nombreCompleto: 'RIOS OSPINA YURI ANDREA', numeroDocumento: '1090150590' },
    { nombreCompleto: 'ROBLEDO ZAPATA DIEGO ALEJANDRO', numeroDocumento: '1039023224' },
    { nombreCompleto: 'RUIZ CARDENAS FABIAN', numeroDocumento: '9865943' },
    { nombreCompleto: 'RUIZ HERNANDEZ MICHEL', numeroDocumento: '91136606' },
    { nombreCompleto: 'SALAZAR HOYOS YONI EDUARDO', numeroDocumento: '4417074' },
    { nombreCompleto: 'SANCHEZ ARRIETA JEISON JAVIER', numeroDocumento: '1067292608' },
    { nombreCompleto: 'SANDOVAL SANABRIA BAIRON STEVENS', numeroDocumento: '1120371135' },
    { nombreCompleto: 'SANTA ROJAS GUILLERMO ALBERTO', numeroDocumento: '18595521' },
    { nombreCompleto: 'SOLER ARCIA GUILLERMO', numeroDocumento: '9790365' },
    { nombreCompleto: 'SUAREZ CALDAS EMIRO ANTONIO', numeroDocumento: '11106203' },
    { nombreCompleto: 'TABARES OSORIO BRAHIAN ESTIVEN', numeroDocumento: '1007192843' },
    { nombreCompleto: 'TABORDA GIL JOHN HENRY', numeroDocumento: '10004028' },
    { nombreCompleto: 'TAPASCO BECERRA YAN CARLOS', numeroDocumento: '1059706827' },
    { nombreCompleto: 'TORO GOMEZ JUAN ANTONIO', numeroDocumento: '1004735003' },
    { nombreCompleto: 'TREJOS GAÑAN EDWIN MAURICIO', numeroDocumento: '1110526699' },
    { nombreCompleto: 'URIBE SUAREZ ROBERTO CARLOS', numeroDocumento: '1087986249' },
    { nombreCompleto: 'VALENCIA VILLEGAS EDUAR YULIAN', numeroDocumento: '1061369101' },
    { nombreCompleto: 'VILLANEDA LADINO ALCIDES DE JESUS', numeroDocumento: '4546870' },
    { nombreCompleto: 'ZAPATA MONCADA LUIS HUMBERTO', numeroDocumento: '10134996' },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const d of this.delegados) {
      const numeroDocumento = d.numeroDocumento.trim();
      const nombreCompleto = d.nombreCompleto.trim();

      const exists = await queryRunner.query(
        `
        SELECT 1
        FROM "delegados"
        WHERE "numero_documento" = $1
        LIMIT 1;
        `,
        [numeroDocumento],
      );

      if (exists.length > 0) {
        continue;
      }

      await queryRunner.query(
        `
        INSERT INTO "delegados" (
          "id",
          "numero_documento",
          "nombre_completo",
          "firmado",
          "created_at"
        )
        VALUES (gen_random_uuid(), $1, $2, false, now());
        `,
        [numeroDocumento, nombreCompleto],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const d of this.delegados) {
      await queryRunner.query(
        `
        DELETE FROM "delegados"
        WHERE "numero_documento" = $1 AND "nombre_completo" = $2;
        `,
        [d.numeroDocumento.trim(), d.nombreCompleto.trim()],
      );
    }
  }
}
