/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('companies', {
    id: 'id',
    name: {type: 'varchar(255)', notNull: true},
    cnpj: {type: 'varchar(255)', notNull: true, unique: true},
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  }),
  pgm.addColumn('clientes', {
    company_id: {
      type: 'integer',
      notNull: true,
      references: '"companies"',
      onDelete: 'cascade'
    },
  })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
