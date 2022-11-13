describe('Test1', () => {
  it('passes', () => {
    cy.visit('https://localhost/')
  })
})

describe('Test2', () => {
  it('passes', () => {
    cy.visit('https://localhost/')
    cy.get('input.form-control') 
    .type('cis3760')
    cy.xpath('//*[@id="results-accordion"]/div/h2/button') //xpath for course result
    cy.contains('CIS*3760 - Software Engineering')
  })
})

describe('Test3', () => {
  it('passes', () => {
    cy.visit('https://localhost/')
    cy.get('input.form-control') 
    .type('cis3760')
    cy.xpath('//*[@id="results-accordion"]/div/h2/button').click() //xpath for course result
    cy.xpath('//*[@id="collapse-225"]/div/div/li[1]/h5/button').click() //xpath for section
    cy.xpath('//*[@id="root"]/div/div[2]/div/div[2]/div/div/div/div[2]/div/table/tbody/tr/td[2]/div/table[2]/tbody/tr/td[2]/div[1]/div/div[1]') //xpath for section table
    cy.contains('CIS*3760 - LEC')
  })
})

describe('Test4', () => {
  it('passes', () => {
    cy.visit('https://localhost/')
    cy.get('input.form-control') 
    .type('cis3760')
    cy.xpath('//*[@id="results-accordion"]/div/h2/button').click() //xpath for course result
    cy.xpath('//*[@id="collapse-225"]/div/div/li[1]/h5/button').click() //xpath for section
    cy.xpath('//*[@id="root"]/div/div[2]/div/div[2]/div/div/div/div[2]/div/table/tbody/tr/td[2]/div/table[2]/tbody/tr/td[2]/div[1]/div/div[1]') //xpath for section table
    cy.contains('CIS*3760 - LEC')
    cy.xpath('//*[@id="root"]/div/div[2]/div/div[1]/div[1]/form/div/div/button').click() //xpath for cross to close search bar
    cy.xpath('//*[@id="root"]/div/div[2]/div/div[1]/div[2]/ul/li/h5/button/i').click() //xpath for cross to remove section
  })
})

describe('Test5', () => {
  it('passes', () => {
    cy.visit('https://localhost/')
    cy.get('input.form-control') 
    .type('cis3760')
    cy.xpath('//*[@id="results-accordion"]/div/h2/button').click() //xpath for course result
    cy.xpath('//*[@id="collapse-225"]/div/div/li[1]/h5/button').click() //xpath for section
    cy.xpath('//*[@id="root"]/div/div[2]/div/div[2]/div/div/div/div[2]/div/table/tbody/tr/td[2]/div/table[2]/tbody/tr/td[2]/div[1]/div/div[1]') //xpath for section table
    cy.contains('CIS*3760 - LEC')
    cy.xpath('//*[@id="root"]/div/div[2]/div/div[1]/div[1]/form/div/div/button').click() //xpath for cross to close search bar
    cy.get('input.form-control') 
    .type('acct1220')
    cy.xpath('//*[@id="results-accordion"]/div/h2/button').click() //xpath for course result
    cy.xpath('//*[@id="collapse-1"]/div/div/li[1]/h5/button/i').click() //xpath for section
    cy.xpath(' //*[@id="root"]/div/div[2]/div/div[2]/div/div/div/div[2]/div/table/tbody/tr/td[2]/div/table[2]/tbody/tr/td[5]/div[1]/div/div[1]') //xpath for cross to close search bar
    cy.contains('ACCT*1220 - LEC')
    cy.xpath('//*[@id="root"]/div/div[2]/div/div[1]/div[1]/form/div/div/button').click()
  })
})