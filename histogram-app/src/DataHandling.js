import * as d3 from 'd3';
import _ from 'lodash';
import stateNames from '../static/data/us-state-names.tsv';

const cleanIncomes = (d) => ({
  countyName: d['Name'],
  USstate: d['State'],
  medianIncome: Number(d['Median Household Income']),
  lowerBound: Number(d['90% CI Lower Bound']),
  uppoerBound:  Number(d['90% CI Upper Bound'])
});

const dateParse = d3.timeParse('%m/%d/%Y');

const cleanSalary = (d) => {
  if (!d['base salary'] || Number(d['base salary']) > 300000) {
    return null;
  }

  return {
    employer: d.employer,
    submit_date: dateParse(d['submit date']),
    start_date: dateParse(d['start date']),
    case_status: d['case status'],
    job_title: d['job title'],
    clean_job_title: d['job title'],
    base_salary: Number(d['base salary']),
    city: d['city'],
    USstate: d['state'],
    county: d['county'],
    countyID: d['countyID']
  };
}

const cleanUSStateName = (d) => ({
  code: d.code,
  id: Number(d.id),
  name: d.name
})

export const loadAllData = (callback = _.noop) => {
  d3.queue()
    .defer(d3.json, 'static/data/us.json')
    .defer(d3.csv, 'static/data/us-county-names-normalized.csv')
    .defer(d3.csv, 'static/data/county-median-incomes.csv', cleanIncomes)
    .defer(d3.csv, 'static/data/h1bs-2012-2016-shortened.csv', cleanSalary)
    .defer(d3.tsv, stateNames, cleanUSStateName)
    .await((error, us, countyNames, medianIncomes, techSalaries, USstateNames) => {
      countyNames = countyNames.map(({ id, name }) => ({id: Number(id), name: name}));

      let medianIncomesMap = {};

      medianIncomes.filter(d => _.find(countyNames, {name: d['countyName']}))
                                .forEach((d) => {
                                                  d['countyID'] = _.find(countyNames, {name: d['countyName']}).id;
                                                  medianIncomesMap[d.countyID] = d;
                                                });

      techSalaries = techSalaries.filter(d => !_.isNull(d));
      callback({
              usTopoJson: us,
              countyNames: countyNames,
              medianIncomes: medianIncomesMap,
              medianIncomesByCounty: _.groupBy(medianIncomes, 'countyName'),
              medianIncomesByUSState: _.groupBy(medianIncomes, 'USstate'),
              techSalaries: techSalaries,
              USstateNames: USstateNames
        });
    });
}
