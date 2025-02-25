const fs = require('fs');
const { ethers } = require('ethers');

async function createWallets(numberOfWallets) {
    const wallets = [];
    for (let i = 0; i < numberOfWallets; i++) {
        const wallet = ethers.Wallet.createRandom();
        wallets.push({
            address: wallet.address,
            private_key: wallet.privateKey
        });
    }
    return wallets;
}

function saveWalletsToFile(wallets, filename) {
    const data = wallets.map(wallet => `Address: ${wallet.address}\nPrivate Key: ${wallet.private_key}\n\n`).join('');
    fs.writeFileSync(filename, data);
}

async function main() {
    try {
        const numberOfWallets = parseInt(prompt("Berapa banyak wallet yang akan dibuat? "), 10);
        if (isNaN(numberOfWallets)) {
            throw new Error("Input tidak valid. Harap masukkan angka.");
        }
        
        const wallets = await createWallets(numberOfWallets);
        
        // Simpan wallet ke penyimpanan
        fs.writeFileSync('wallets.json', JSON.stringify(wallets, null, 4));
        
        // Buat file TXT yang berisi semua privat key
        saveWalletsToFile(wallets, 'private_keys.txt');
        
        console.log(`${numberOfWallets} wallet telah dibuat dan disimpan ke 'wallets.json' dan 'private_keys.txt'.`);
    } catch (error) {
        console.error(`Terjadi kesalahan: ${error.message}`);
    }
}

main();