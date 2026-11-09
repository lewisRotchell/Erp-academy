import { test,expect } from '@playwright/test';
test('learn, complete a quiz, persist and revise',async({page},testInfo)=>{
 await page.goto('');await expect(page.getByRole('heading',{name:'Welcome to your next chapter.'})).toBeVisible();
 await page.screenshot({path:`/tmp/erp-${testInfo.project.name}.png`,fullPage:true});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
 await page.getByRole('link',{name:'Start learning',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Assets, Liabilities & Equity',exact:true})).toBeVisible();
 await page.getByLabel('Your answer (£)').fill('24000');await page.getByRole('button',{name:'Check answer'}).click();await expect(page.getByText('Exactly right.')).toBeVisible();
 await page.getByRole('button',{name:'A A current asset',exact:true}).click();await page.getByRole('button',{name:'Next question'}).click();
 await page.getByRole('button',{name:'B Assets and liabilities both increase',exact:true}).click();await page.getByRole('button',{name:'Next question'}).click();
 await page.getByRole('button',{name:'C Assets less liabilities',exact:true}).click();await page.getByRole('button',{name:'See results'}).click();await expect(page.getByText('You scored 3 of 3.',{exact:false})).toBeVisible();
 await page.reload();await page.goto('#/progress');await expect(page.getByText('Best: 100%')).toBeVisible();
 await page.goto('#/revision');await expect(page.getByText('Next review:',{exact:false})).toBeVisible();
 await page.getByRole('button',{name:'Practise early'}).click();await page.getByRole('button',{name:'B A liability',exact:true}).click();await expect(page.getByText('Not quite.',{exact:true})).toBeVisible();
});
test('glossary, upcoming content, theme and mobile navigation',async({page},testInfo)=>{
 await page.goto('');if(testInfo.project.name==='iphone'){await page.getByRole('button',{name:'Open navigation'}).click();await page.getByRole('link',{name:'Glossary',exact:true}).click();}else await page.getByRole('link',{name:'Glossary',exact:true}).click();
 await page.getByRole('textbox',{name:'Search glossary'}).fill('SKU');await expect(page.getByRole('heading',{name:'SKU',exact:true})).toBeVisible();await expect(page.getByRole('heading',{name:'Assets',exact:true})).toHaveCount(0);
 await page.goto('#/subjects/sales');await expect(page.getByText('Customer records & credit limits', {exact:true})).toBeVisible();await expect(page.locator('.module-lessons a')).toHaveCount(0);
 await page.goto('#/settings');await page.getByRole('button',{name:'Dark',exact:true}).click();await expect(page.locator('html')).toHaveClass('dark');await page.reload();await expect(page.locator('html')).toHaveClass('dark');
 await page.getByRole('button',{name:'Reset progress',exact:true}).click();await expect(page.getByRole('dialog')).toBeVisible();await page.getByRole('button',{name:'Cancel',exact:true}).click();
});
test('backup export and validated import replace progress only on confirmation',async({page})=>{
 await page.goto('#/settings');const downloadPromise=page.waitForEvent('download');await page.getByRole('button',{name:'Export progress'}).click();const download=await downloadPromise;expect(download.suggestedFilename()).toMatch(/^erp-academy-progress-/);
 const date=new Date().toISOString();const backup={version:1,theme:'light',currentLesson:'assets-liabilities-equity',lessons:{'assets-liabilities-equity':{status:'Needs Revision',started:date,lastStudied:date,completed:date,attempts:[{score:3,total:3,date}],revisionStep:0,due:'2020-01-01T12:00:00.000Z'}}};
 await page.getByLabel('Import progress file').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});await expect(page.getByRole('dialog')).toBeVisible();await page.getByRole('button',{name:'Replace progress',exact:true}).click();await expect(page.getByText('Progress imported successfully.')).toBeVisible();
 await page.goto('#/revision');await expect(page.getByRole('heading',{name:'1 topics ready for a refresh.'})).toBeVisible();await page.getByRole('button',{name:'Start revision',exact:true}).click();await expect(page.getByRole('heading',{name:'Batteries purchased for resale are usually…'})).toBeVisible();
 await page.goto('#/settings');await page.getByLabel('Import progress file').setInputFiles({name:'invalid.json',mimeType:'application/json',buffer:Buffer.from('{"version":99}')});await expect(page.getByText('Unsupported or invalid progress file.')).toBeVisible();await page.goto('#/progress');await expect(page.getByText('Best: 100%')).toBeVisible();
});
