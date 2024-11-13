import { exec } from 'node:child_process';

function checkPostgresConnection() {
	exec('docker exec postgres-dev pg_isready --host localhost', handleReturn);

	function handleReturn(_: Error, stout: string) {
		if (stout.search('accepting connections') === -1) {
			process.stdout.write('.');
			checkPostgresConnection();
			return;
		}
		console.log('.\n');
		console.log("--> Yes! Everything is working fine here ':)' \n");
	}
}

process.stdout.write('--> Waiting for postgres to accept connections.\n');

checkPostgresConnection();
