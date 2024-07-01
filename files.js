const fs = require('fs').promises;

async function listFilesInDirectory() {
  try {
    const files = await fs.readdir(__dirname);
    console.log(files);

    const fileDetails = await Promise.all(
      files.map(async filename => {
        const stats = await fs.stat(filename);
        return {
          Name: filename,
          Size: stats.size,
          Date: stats.mtime
        };
      })
    );

    console.table(fileDetails);
  } catch (err) {
    console.error(err.message);
  }
}

async function exampleFileOperations() {
  const filename = 'example.txt';

  try {
    // Scriem într-un fișier
    await fs.writeFile(filename, 'Hello, World!', 'utf8');
    console.log('Fișierul a fost scris cu succes.');

    // Adăugăm text în fișier
    await fs.appendFile(filename, '\nThis is an appended line.', 'utf8');
    console.log('Textul a fost adăugat cu succes.');

    // Citim conținutul fișierului
    const data = await fs.readFile(filename, 'utf8');
    console.log('Conținutul fișierului:', data);

    // Redenumim fișierul
    const newFilename = 'example-renamed.txt';
    await fs.rename(filename, newFilename);
    console.log(`Fișierul a fost redenumit în ${newFilename}.`);

    // Ștergem fișierul
    await fs.unlink(newFilename);
    console.log('Fișierul a fost șters cu succes.');
  } catch (err) {
    // Gestionăm eventualele erori
    console.log(err.message);
  }
}

listFilesInDirectory();
exampleFileOperations();