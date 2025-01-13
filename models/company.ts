import { Prisma } from '@prisma/client';
import { defaultRoles } from 'constants/defaultRoles';
import prisma from 'infra/database';
import { CompanyInput } from 'types/dto/company';
type CompanyWithUser = Prisma.CompanyGetPayload<{
	include: {
		userCompany: {
			include: {
				user: true;
			};
		};
		companyRole: {
			include: {
				role: true;
			};
		};
	};
}>;

async function createCompany(payload: CompanyInput): Promise<CompanyWithUser> {
	const result = await prisma.company.create({
		data: {
			name: payload.name,
			userCompany: {
				create: {
					user: {
						connect: {
							id: payload.user_id
						}
					}
				}
			},
			companyRole: {
				create: {
					role: {
						create: {
							name: defaultRoles.admin,
							userRole: {
								create: {
									user: {
										connect: {
											id: payload.user_id
										}
									}
								}
							}
						}
					}
				}
			}
		},
		include: {
			userCompany: {
				include: {
					user: {
						include: {
							userRole: true
						}
					}
				}
			},
			companyRole: {
				include: {
					role: {
						include: {
							userRole: {
								include: {
									user: true
								}
							}
						}
					}
				}
			}
		}
	});
	return result;
}

export default Object.freeze({ createCompany });
