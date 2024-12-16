import { setDefaultOptions } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DefaultOptions } from 'date-fns/_lib/defaultOptions';

const options: DefaultOptions = {
	locale: ptBR
};
setDefaultOptions(options);
