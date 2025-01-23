export const getUserRolesFromACompany = `select r.* from roles r 
inner join user_role ur on ur.role_id = r.id
inner join users u on u.id = ur.user_id
inner join company_role cr on cr.role_id = r.id
inner join companies c on c.id = cr.company_id
where u.id = $1 and
c.id = $2`;

export const getUserById = `select * from users where id = $1`;
