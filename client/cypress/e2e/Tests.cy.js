describe('Check the liveness of the server', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/');
  });
});

describe('Search a course and check the correct value', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input.form-control').type('cis3760');
    cy.xpath('//*[@id="results-accordion"]/div/h2/button'); //xpath for course result
    cy.contains('CIS*3760 - Software Engineering');
  });
});

describe('Add a section of a course to schedule and check the timing is correct', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input.form-control').type('cis3760');
    cy.xpath('//*[@id="results-accordion"]/div/h2/button').click(); //xpath for course result
    cy.xpath('//*[@id="collapse-225"]/div/div/li[1]/h5/button').click(); //xpath for section
    cy.xpath('//*[@id="root"]/div/div[2]/div/div[2]/div/div/div/div[2]/div/table/tbody/tr/td[2]/div/table[2]/tbody/tr/td[2]/div[1]/div/div[1]'); //xpath for section table
    cy.contains('CIS*3760 - LEC');
  });
});

describe('Add a section, check the timing and then remove the section', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input.form-control').type('cis3760');
    cy.xpath('//*[@id="results-accordion"]/div/h2/button').click(); //xpath for course result
    cy.xpath('//*[@id="collapse-225"]/div/div/li[1]/h5/button').click(); //xpath for section
    cy.xpath('//*[@id="root"]/div/div[2]/div/div[2]/div/div/div/div[2]/div/table/tbody/tr/td[2]/div/table[2]/tbody/tr/td[2]/div[1]/div/div[1]'); //xpath for section table
    cy.contains('CIS*3760 - LEC');
    cy.xpath('//*[@id="root"]/div/div[2]/div/div[1]/div[1]/form/div/div/button').click(); //xpath for cross to close search bar
    cy.xpath('//*[@id="root"]/div/div[2]/div/div[1]/div[2]/ul/li/h5/button/i').click(); //xpath for cross to remove section
  });
});

describe('Add 2 sections of 2 different courses', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input.form-control').type('cis3760');
    cy.xpath('//*[@id="results-accordion"]/div/h2/button').click(); //xpath for course result
    cy.xpath('//*[@id="collapse-225"]/div/div/li[1]/h5/button').click(); //xpath for section
    cy.xpath('//*[@id="root"]/div/div[2]/div/div[2]/div/div/div/div[2]/div/table/tbody/tr/td[2]/div/table[2]/tbody/tr/td[2]/div[1]/div/div[1]'); //xpath for section table
    cy.contains('CIS*3760 - LEC');
    cy.xpath('//*[@id="root"]/div/div[2]/div/div[1]/div[1]/form/div/div/button').click(); //xpath for cross to close search bar
    cy.get('input.form-control').type('acct1220');
    cy.xpath('//*[@id="results-accordion"]/div/h2/button').click(); //xpath for course result
    cy.xpath('//*[@id="collapse-1"]/div/div/li[1]/h5/button/i').click(); //xpath for section
    cy.xpath('//*[@id="root"]/div/div[2]/div/div[2]/div/div/div/div[2]/div/table/tbody/tr/td[2]/div/table[2]/tbody/tr/td[5]/div[1]/div/div[1]'); 
    cy.contains('ACCT*1220 - LEC');
    cy.xpath('//*[@id="root"]/div/div[2]/div/div[1]/div[1]/form/div/div/button').click(); //xpath for cross to close search bar
  });
});

describe('Add a section and check if the final exam was added correctly', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input.form-control').type('acct1220');
    cy.xpath('//*[@id="results-accordion"]/div/h2/button').click(); //xpath for course result
    cy.xpath('//*[@id="collapse-1"]/div/div/li[1]/h5/button/i').click(); //xpath for section
    cy.xpath('//*[@id="root"]/div/div[2]/div/div[2]/div/div/div/div[2]/div/table/tbody/tr/td[2]/div/table[2]/tbody/tr/td[5]/div[1]/div/div[1]'); 
    cy.contains('ACCT*1220 - LEC');
    cy.xpath('//*[@id="root"]/div/div[2]/div/div[1]/div[1]/form/div/div/button').click(); //xpath for cross to close search bar
    cy.xpath('//*[@id="root"]/div/div[2]/div/div[2]/div/div[2]/button').click(); //xpath for view exam
    cy.xpath('//*[@id="root"]/div/div[2]/div/div[2]/div/div[1]'); //xpath for exam table
    cy.contains('ACCT*1220 - EXAM');
  });
});
