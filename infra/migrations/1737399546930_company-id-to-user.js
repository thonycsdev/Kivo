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
  pgm.addColumn('clientes', {
    company_id: {
      type: 'integer',
      notNull: true
    },
  });


  pgm.addConstraint('clientes', 'fk_clientes_company_id', {
    foreignKeys: {
      columns: 'company_id',
      references: 'companies(id)',
      onDelete: 'CASCADE'
    }
  })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropConstraint('company_id', 'fk_customers_company_id');
  pgm.dropColumn('clientes', 'company_id');
};

