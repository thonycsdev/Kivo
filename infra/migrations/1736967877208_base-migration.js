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
    // Criação das ENUMs
    pgm.createType('means_of_communication', ['Whatsapp', 'Chamada']);
    pgm.createType('status', ['ACTIVE', 'INACTIVE']);
    pgm.createType('selling_potential', ['Interessado', 'EmNegociacao', 'AltaProbabilidade', 'Perdido', 'ContratoAssinado']);
  
    // Criação da tabela "users"
    pgm.createTable('users', {
      id: { type: 'serial', primaryKey: true },
      name: { type: 'varchar(255)', notNull: true },
      email: { type: 'varchar(255)', notNull: true, unique: true },
      password: { type: 'varchar(255)', notNull: true },
      created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
      updated_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
    });
  
    // Criação da tabela "companies"
    pgm.createTable('companies', {
      id: { type: 'serial', primaryKey: true },
      name: { type: 'varchar(255)', notNull: true, unique: true },
    });
  
    // Criação da tabela "user_company" (tabela de junção)
    pgm.createTable('user_company', {
      user_id: { type: 'integer', notNull: true, references: 'users(id)', onDelete: 'cascade' },
      company_id: { type: 'integer', notNull: true, references: 'companies(id)', onDelete: 'cascade' },
    });
    pgm.addConstraint('user_company', 'user_company_pk', { primaryKey: ['user_id', 'company_id'] });
  
    // Criação da tabela "roles"
    pgm.createTable('roles', {
      id: { type: 'serial', primaryKey: true },
      name: { type: 'varchar(255)', notNull: true },
    });
  
    // Criação da tabela "user_role" (tabela de junção)
    pgm.createTable('user_role', {
      user_id: { type: 'integer', notNull: true, references: 'users(id)', onDelete: 'cascade' },
      role_id: { type: 'integer', notNull: true, references: 'roles(id)', onDelete: 'cascade' },
    });
    pgm.addConstraint('user_role', 'user_role_pk', { primaryKey: ['user_id', 'role_id'] });
  
    // Criação da tabela "company_role" (tabela de junção)
    pgm.createTable('company_role', {
      company_id: { type: 'integer', notNull: true, references: 'companies(id)', onDelete: 'cascade' },
      role_id: { type: 'integer', notNull: true, references: 'roles(id)', onDelete: 'cascade' },
    });
    pgm.addConstraint('company_role', 'company_role_pk', { primaryKey: ['company_id', 'role_id'] });
  
    // Criação da tabela "clientes"
    pgm.createTable('clientes', {
      id: { type: 'serial', primaryKey: true },
      name: { type: 'varchar(255)', notNull: true },
      cpf: { type: 'varchar(14)', notNull: true, unique: true },
      address: { type: 'text' },
      email: { type: 'varchar(255)', notNull: true, unique: true },
      phone_number: { type: 'varchar(20)' },
      facebook: { type: 'varchar(255)' },
      instagram: { type: 'varchar(255)' },
      whatsapp: { type: 'varchar(255)' },
      personal_phone_number: { type: 'varchar(20)', notNull: true },
      job_title: { type: 'varchar(255)' },
      job_position: { type: 'varchar(255)' },
      gross_income: { type: 'float' },
      net_income: { type: 'float' },
      has_financing: { type: 'boolean', notNull: true },
      has_fgts: { type: 'boolean', notNull: true },
      selling_potential_tag: { type: 'selling_potential' },
      marital_status: { type: 'varchar(50)' },
      family_members_amount: { type: 'integer' },
      description: { type: 'text' },
      preferred_means_of_communication: { type: 'means_of_communication', notNull: true, default: 'Whatsapp' },
      has_been_contacted: { type: 'boolean', notNull: true, default: false },
      status: { type: 'status', notNull: true, default: 'ACTIVE' },
      birth_date: { type: 'timestamp', notNull: true },
      created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
      updated_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
    });
  };
  
/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('clientes');
    pgm.dropTable('company_role');
    pgm.dropTable('user_role');
    pgm.dropTable('roles');
    pgm.dropTable('user_company');
    pgm.dropTable('companies');
    pgm.dropTable('users');
  
    pgm.dropType('means_of_communication');
    pgm.dropType('status');
    pgm.dropType('selling_potential');
  };
