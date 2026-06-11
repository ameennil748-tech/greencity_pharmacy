# Online Hosting & Domain Setup Guide - Green City Pharmacy

Since your website is built using static client-side technologies (HTML, CSS, and Vanilla JavaScript), it is extremely lightweight, fast, and secure. It can be hosted online for **100% free** using modern cloud hosting platforms like Netlify, Vercel, or GitHub Pages.

Follow these 4 simple steps to put your website online, set up your custom domain, and show up on Google searches.

---

## Step 1: Host Your Website Online for Free (Choose One)

### Option A: netlify (Recommended - Easiest & Fastest)
1. Go to [netlify.com](https://www.netlify.com/) and sign up for a free account.
2. Once logged in, go to the **Sites** tab.
3. Scroll down to the bottom where it says **"Want to deploy a new site without Git? Drag and drop your site folder here"**.
4. Drag your entire `greencity_pharmacy` folder and drop it into that upload box.
5. In less than 10 seconds, your site will be deployed! Netlify will give you a free temporary web address like `https://green-city-pharmacy.netlify.app`.

### Option B: GitHub Pages (100% Free Hosting)

This is a completely free option provided by GitHub. You do not need any coding or terminal commands to set this up—you can do it all directly in your web browser.

#### Visual Tutorial Infographic
Here is a step-by-step visual guide to help you follow along:
![GitHub Pages Deployment Infographic](C:/Users/acer/.gemini/antigravity/brain/5b5d61af-2e03-4e3d-8cdb-1ceed69aa401/github_pages_tutorial_1781172415815.png)

#### Detailed Action Steps:
1. **Create a GitHub Account**:
   * Visit [github.com](https://github.com/) and click **Sign Up** to create your free account.
2. **Create a New Repository (Project Folder)**:
   * Once logged in, click the **"+"** dropdown in the top-right corner of the page and select **New repository**.
   * In the **Repository name** field, type: `greencity_pharmacy`
   * Under visibility, ensure **Public** is selected (this is required for the free hosting option).
   * Leave all other settings (README, .gitignore, license) unchecked.
   * Scroll down and click the green **Create repository** button.
3. **Upload Your Project Files**:
   * On the page that appears, look for the quick setup instructions. Click the blue link that says **uploading an existing file**.
   * Open the project folder on your computer: `C:\Users\acer\.gemini\antigravity\scratch\greencity_pharmacy`
   * Select the following files and folders:
     * `index.html`
     * `styles.css`
     * `app.js`
     * `ad-creator.html`
     * `ad-creator.css`
     * `ad-creator.js`
     * `assets` (the entire folder containing images/icons)
   * **Drag and drop** these files into the upload area on your web browser.
   * Once all files finish loading, scroll down to **Commit changes**.
   * Type a summary like `Upload Green City Pharmacy site` and click the green **Commit changes** button.
4. **Activate GitHub Pages Hosting**:
   * Look at the tabs near the top of your repository page (below the repository title) and click on **Settings** (has a gear icon).
   * In the left sidebar, scroll down to the **Code and automation** section and click on **Pages**.
   * Under the **Build and deployment** section, look for **Branch**:
     * Click the dropdown that currently says **None** and change it to **main** (or `master` depending on your repository's default branch).
     * Leave the folder as `/ (root)`.
     * Click the **Save** button.
5. **View Your Online Website**:
   * Wait 1 to 2 minutes for GitHub to build your site in the background.
   * Refresh the page. At the top of the **Pages** section, you will see a success message:
     > **Your site is live at** `https://yourusername.github.io/greencity_pharmacy/`
   * Click this link to open your pharmacy portal online! Any customer can now access it using this link.

---

## Step 2: Register Your Custom Domain Name
To make your pharmacy look professional, you should buy a custom web address (like `greencitypharmacy.in` or `greencitypharmacy.com`).

1. Go to a domain registrar like **GoDaddy**, **Namecheap**, or **Hostinger**.
2. Search for your desired website name (e.g., `greencitypharmacy.in` or `greencitypharmacy.com`).
3. Purchase the domain (usually costs between ₹200 to ₹800 per year depending on the extension `.in` or `.com`).

---

## Step 3: Link Your Custom Domain to Your Hosting

If you hosted your site on **Netlify** (Option A):
1. In your Netlify dashboard, click on your deployed pharmacy website.
2. Go to **Site Settings** -> **Domain management** -> **Add custom domain**.
3. Type your registered domain (e.g., `greencitypharmacy.in`) and click **Save**.
4. Netlify will show you **DNS Settings**. It will give you name servers (e.g., `dns1.p01.nsone.net`, `dns2.p01.nsone.net`...).
5. Log in to your domain registrar (GoDaddy/Namecheap), go to **DNS Management** or **Nameservers** for your domain, and replace the default nameservers with the ones Netlify provided.
6. Within 1 to 24 hours, your domain will link up, and typing `www.greencitypharmacy.in` will open your website with a secure HTTPS padlock icon!

---

## Step 4: Show Up on Google Search (Indexing)
To make sure typing "Green City Pharmacy" on Google shows your website online:

1. **Create a Sitemap**: Since this is a simple single-page website, your sitemap is just a text file. You can create a file named `sitemap.xml` listing your website domain.
2. **Setup Google Search Console**:
   * Go to [search.google.com/search-console](https://search.google.com/search-console/) and log in with your Google account.
   * Select **Add Property** and enter your custom domain name (e.g., `https://www.greencitypharmacy.in`).
   * Verify ownership by adding a small TXT record inside your DNS settings (on Netlify or GoDaddy), or adding a meta tag into your `index.html` file header.
3. **Submit Sitemap**:
   * Once verified, click on **Sitemaps** in Google Search Console.
   * Submit your homepage URL to tell Google to crawl and index your page.
4. **Google Business Profile (Crucial for Local Pharmacy)**:
   * Go to [google.com/business](https://www.google.com/business/) and create a free local store card for **Green City Pharmacy**.
   * Enter your physical mall address, phone number, and operating hours.
   * Add a link to your new custom domain (`https://www.greencitypharmacy.in`).
   * This is the absolute best way to ensure local customers search "pharmacy near me" and see your physical shop and website on Google Maps immediately!
