import React from 'react';
import FinanceTeamMember from './\Pages\Finance_Team\finance_team_mem_home_page.js'; 

const FinanceTeamPage = () => {
  return (
    <div>
      <h2>Finance Team Dashboard</h2>
      <p>Welcome to the finance team dashboard. Here you can manage consultant hourly rates.</p>
      <FinanceTeamMember />
    </div>
  );
};

export default FinanceTeamPage;
