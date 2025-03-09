import { MigrationInterface, QueryRunner } from 'typeorm';

export class AssignDefaultUserToArtists implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Option 1: Associate with a default user (replace DEFAULT_USER_ID with an actual UUID)
    await queryRunner.query(`
            UPDATE artist 
            SET user_id = 'DEFAULT_USER_ID'
            WHERE user_id IS NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // If using Option 1:
    await queryRunner.query(`
            UPDATE artist 
            SET user_id = NULL 
            WHERE user_id = 'DEFAULT_USER_ID'
        `);
  }
}
