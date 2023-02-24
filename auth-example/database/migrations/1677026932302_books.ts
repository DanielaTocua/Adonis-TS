import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Books extends BaseSchema {
  protected tableName = 'books'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title',200).notNullable();
      table.integer('author',200).unsigned().notNullable();
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
