import { test, expect} from '@playwright/test';
const phone = '6280000000000';
const password = 'xxxxxxxxx';
const baseURL = 'https://staging.evermosa2z.com/'

test('Login', async ({ page }) => {

  await page.goto(baseURL + 'login');
  await expect(page.locator('[class="pageCopy__title"]')).toContainText('Ayo Masuk!');

  await page.getByPlaceholder('Nomor Telepon Anda').click();
  await page.getByPlaceholder('Nomor Telepon Anda').fill(phone);

  await page.getByPlaceholder('Kata Sandi Anda').click();
  await page.getByPlaceholder('Kata Sandi Anda').fill(password);

  await page.getByRole('button', { name: 'Masuk' }).click();

  await expect(page).toHaveURL(baseURL + 'catalog');
});

test('Search Product', async ({ page }) => {
  await page.locator('[class="appHead__search__input"]').click()
  await expect(page).toHaveURL(baseURL + 'search');              //assertion

  await page.locator("[class='appHeading__search__input']").fill('peci')
//  await expect.soft('[class="results"]').toBeVisible();                             //coba visible suggestion
  await page.getByRole('link', { name: 'Peci Dewasa Subkategori' }).click();
  await expect(page).toHaveURL(baseURL + 'browse?typeId=3120&orderBy=0&navSource=search_result');

  await page.getByRole('link', { name: 'Jawa Barat' }).click();
  await expect(page).toHaveURL(baseURL + 'browse?typeId=3120&orderBy=0&navSource=search_result&districtIds=22,23,24,54,55,78,79,103,104,107,109,115,126,171,252,332,376,431,440,469');
});

test('Negative Case Search Product => Hasil Pencarian Tidak Ada', async ({ page }) => {
  await page.getByRole('link', { name: 'Snack' }).click();
  await expect(page.locator('[class="appLayoutHeading__title"]')).toContainText('Snack');

  await page.getByRole('link', { name: 'Filter' }).click();
  await page.locator('label:has-text("Dikirim dari Gudang Evermos") span').first().click();
  await page.locator('label:has-text("Dijual untuk di Marketplace") span').first().click();
  await page.getByPlaceholder('0').fill('1.000');
  await page.getByPlaceholder('25.000.000').fill('5000');

  await page.getByRole('link', { name: 'Pilih Asal Pengiriman Semua Wilayah' }).click();
  await page.getByPlaceholder('Cari Kota/Provinsi').fill('surabaya');
  await page.locator('label:has-text("Kota Surabaya, Jawa Timur") div').click();
  await page.getByRole('button', { name: 'Simpan' }).click();

  await page.getByRole('button', { name: 'Terapkan' }).click();
  await expect(page.locator('[class="fs-18 lh-22 mt-0 mb-4 fw-700"]')).toContainText('Hasil Pencarianmu Tidak Ada');
});

test('Negative Case Buy Product => Toko Sedang Tutup', async ({ page }) => {
  await page.getByRole('link', { name: 'Wardana - Peci Haji Rajut Motif Eksklusif' }).click();
  await expect(page.locator('[class="productView__title"]')).toContainText('Wardana - Peci Haji Rajut Motif Eksklusif');

  await page.locator('span:has-text("Maroon")').click();
  await page.getByRole('link', { name: 'Beli Sekarang' }).click();

  await expect(page.locator('[class="appDialog__title"]')).toContainText('Mohon maaf');
  await expect(page.locator('[class="appDialog__message"]')).toContainText('Toko sedang tutup sementara');
});

const variant_peci = ['Putih Polos', 'Merah Putih', 'Hitam Polos', 'Hitam Cream', 'Hitam Emas'];
const size_peci = ['7', '8', '9', '10', '11'];
const randvariant = variant_peci[Math.floor(Math.random() * variant_peci.length)];
const randsize = size_peci[Math.floor(Math.random() * size_peci.length)];

test('Buy Product', async ({ page }) => {
  await page.getByRole('link', { name: 'RN Peci Rajut Assalam' }).click();
  await expect(page.locator('[class="productView__title"]')).toContainText('RN Peci Rajut Assalam');
  
  await page.locator('[class="variantOption"]').getByText(randvariant).click();
  await page.locator('[class="variantOption"]').getByText(randsize).click()
  
  await page.getByRole('link', { name: 'Beli Sekarang' }).click();
  await expect(page.locator('[class="appLayoutHeading__title"]')).toContainText('Detail Pengiriman');

  await page.locator('div:nth-child(3) > i > span').click();
//  await expect.soft(page.locator('[class="step_nominal"]')).toHaveCount(2);
  await page.locator('a:has-text("Lanjutkan")').click();
  
  await page.getByRole('button', { name: 'Lihat Keranjang' }).click();
  await expect(page.locator('[class="appLayoutHeading__title"]')).toContainText('Keranjang');
  
  await page.getByRole('link', { name: 'Lanjut ke Checkout' }).click();

//Assertion Produk benar sesuai yang dipesan
  await expect(page.locator('[class="appLayoutHeading__title"]')).toContainText('Checkout');
  await expect(page.locator('[class="addressTitleBar__name"]]')).toContainText('Rumah');
  await expect(page.locator('[class="orderItem__productName"]]')).toContainText(`RN Peci Rajut Assalam ${randvariant} ${randsize}`);

  await page.getByRole('link', { name: 'Lihat Promo Tersedia' }).click();
  await expect(page.locator('[class="appLayoutHeading__title"]')).toContainText('Voucher Saya');
  await page.locator('[class="filterSection__tab"]').getByText('Potongan Ongkir').click();

  await page.locator('.btn--brand voucher__button').first().click();      // Pilih voucher paling atas

  await page.getByRole('button', { name: 'OK' }).click();
  await expect(page).toHaveURL(baseURL + 'order/checkout');

  await page.getByLabel('Mau Berinfaq Hari ini').check();
  await page.getByRole('button', { name: 'Rp5.000' }).click();

  await page.getByRole('link', { name: 'Proses Sekarang' }).click();
  await page.getByRole('button', { name: 'Bayar' }).click();
  await expect(page.locator('[class="appLayoutHeading__title"]')).toContainText('Pilih Metode Pembayaran');

  await page.locator('[class="a-payment-list-item__title"]")').toContainText('Danamon Online').click();
  await page.getByRole('button', { name: 'Pay now' }).click();
  await page.getByRole('button', { name: 'Pay' }).click();
  await page.getByRole('button', { name: 'Back to merchant website' }).click();
  await expect(page.locator('[class="heading"]')).toContainText('Pembayaran Berhasil');

  await page.getByRole('link', { name: 'Lihat Daftar Pesanan' }).click();
  await expect(page.locator('[class="appLayoutHeading__title"]')).toContainText('Transaksi Aplikasi');

});