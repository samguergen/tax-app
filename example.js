function federal_tax(){

		single_tiers = {
			'tier1': {'income': 406750, 'base_tax': 118118.25, 'marginal_tax': 39.6}, 
			'tier2': {'income': 405100, 'base_tax': 117541.25, 'marginal_tax': 35},
			'tier3': {'income': 186350, 'base_tax': 45353.75, 'marginal_tax': 33},
			'tier4': {'income': 89350, 'base_tax': 18193.74, 'marginal_tax': 28},
			'tier5': {'income': 36900, 'base_tax': 5081.25 , 'marginal_tax': 25},
			'tier6': {'income': 9075, 'base_tax': 907.5, 'marginal_tax': 15}
		};


		joint_tiers = {
			'tier1': {'income': 457600, 'base_tax': 127962.5, 'marginal_tax': 39.6}, 
			'tier2': {'income': 405100, 'base_tax': 109587.5, 'marginal_tax': 35},
			'tier3': {'income': 226850, 'base_tax': 50765, 'marginal_tax': 33},
			'tier4': {'income': 148850, 'base_tax': 28925, 'marginal_tax': 28},
			'tier5': {'income': 73800, 'base_tax': 10162.5 , 'marginal_tax': 25},
			'tier6': {'income': 18150, 'base_tax': 1815, 'marginal_tax': 15}
		};

		separate_tiers = {
			'tier1': {'income': 228800, 'base_tax': 63981.25, 'marginal_tax': 39.6}, 
			'tier2': {'income': 202550, 'base_tax': 54793.75, 'marginal_tax': 35},
			'tier3': {'income': 113425, 'base_tax': 25382.5, 'marginal_tax': 33},
			'tier4': {'income': 74425, 'base_tax': 14462.5, 'marginal_tax': 28},
			'tier5': {'income': 36900, 'base_tax': 5081.25, 'marginal_tax': 25},
			'tier6': {'income': 9075, 'base_tax': 907.5, 'marginal_tax': 15}
		}



	// single_tiers = {}
	// single_tiers["tier1"] = {}
	// single_tiers["tier1"]["income"] = 4 

	console.log(single_tiers["tier1"]["income"]);
	console.log(single_tiers.tier1.income)

}

federal_tax();

	// 	# single_tiers.each { |key, value| puts value}
	// 	# puts "hello"
	// 	# puts single_tiers["tier1"]["income"]
	// 	# puts "bye"

	// 	# if @single_agi
	// 	# 	if @single_agi > single_tiers.tier1.income
	// 	# 		@single_fed_tax = single_tiers.tier1.base_tax + ((@single_agi - single_tiers.tier1.income) * (single_tiers.tier1.marginal_tax / 100))
	// 	# 	elsif @single_agi > single_tiers.tier2.income
	// 	# 		@single_fed_tax = single_tiers.tier2.base_tax + ((@single_agi - single_tiers.tier2.income) * (single_tiers.tier2.marginal_tax / 100))
	// 	# 	elsif @single_agi > single_tiers.tier3.income
	// 	# 		@single_fed_tax = single_tiers.tier3.base_tax + ((@single_agi - single_tiers.tier3.income) * (single_tiers.tier3.marginal_tax / 100))
	// 	# 	elsif @single_agi > single_tiers.tier4.income
	// 	# 		@single_fed_tax = single_tiers.tier4.base_tax + ((@single_agi - single_tiers.tier4.income) * (single_tiers.tier4.marginal_tax / 100))
	// 	# 	elsif @single_agi > single_tiers.tier5.income
	// 	# 		@single_fed_tax = single_tiers.tier5.base_tax + ((@single_agi - single_tiers.tier5.income) * (single_tiers.tier5.marginal_tax / 100))
	// 	# 	elsif @single_agi > single_tiers.tier6.income
	// 	# 		@fed_tax = single_tiers.tier6.base_tax + ((@single_agi - single_tiers.tier6.income) * (single_tiers.tier6.marginal_tax / 100))
	// 	# 	end

	// 	# elsif @joint_agi
	// 	# 	if @joint_agi > joint_tiers.tier1.income
	// 	# 		@joint_fed_tax = joint_tiers.tier1.base_tax + ((@joint_agi - joint_tiers.tier1.income) * (joint_tiers.tier1.marginal_tax / 100))
	// 	# 	elsif @joint_agi > joint_tiers.tier2.income
	// 	# 		@joint_fed_tax = joint_tiers.tier2.base_tax + ((@joint_agi - joint_tiers.tier2.income) * (joint_tiers.tier2.marginal_tax / 100))
	// 	# 	elsif @joint_agi > joint_tiers.tier3.income
	// 	# 		@joint_fed_tax = joint_tiers.tier3.base_tax + ((@joint_agi - joint_tiers.tier3.income) * (joint_tiers.tier3.marginal_tax / 100))
	// 	# 	elsif @joint_agi > joint_tiers.tier4.income
	// 	# 		@joint_fed_tax = joint_tiers.tier4.base_tax + ((@joint_agi - joint_tiers.tier4.income) * (joint_tiers.tier4.marginal_tax / 100))
	// 	# 	elsif @joint_agi > joint_tiers.tier5.income
	// 	# 		@joint_fed_tax = joint_tiers.tier5.base_tax + ((@joint_agi - joint_tiers.tier5.income) * (joint_tiers.tier5.marginal_tax / 100))
	// 	# 	elsif @joint_agi > joint_tiers.tier6.income
	// 	# 		@fed_tax = joint_tiers.tier6.base_tax + ((@joint_agi - joint_tiers.tier6.income) * (joint_tiers.tier6.marginal_tax / 100))
	// 	# 	end



	// 	# elsif @separate_agi
	// 	# 	if @separate_agi > separate_tiers.tier1.income
	// 	# 		@separate_fed_tax = separate_tiers.tier1.base_tax + ((@separate_agi - separate_tiers.tier1.income) * (separate_tiers.tier1.marginal_tax / 100))
	// 	# 	elsif @separate_agi > separate_tiers.tier2.income
	// 	# 		@separate_fed_tax = separate_tiers.tier2.base_tax + ((@separate_agi - separate_tiers.tier2.income) * (separate_tiers.tier2.marginal_tax / 100))
	// 	# 	elsif @separate_agi > separate_tiers.tier3.income
	// 	# 		@separate_fed_tax = separate_tiers.tier3.base_tax + ((@separate_agi - separate_tiers.tier3.income) * (separate_tiers.tier3.marginal_tax / 100))
	// 	# 	elsif @separate_agi > separate_tiers.tier4.income
	// 	# 		@separate_fed_tax = separate_tiers.tier4.base_tax + ((@separate_agi - separate_tiers.tier4.income) * (separate_tiers.tier4.marginal_tax / 100))
	// 	# 	elsif @separate_agi > separate_tiers.tier5.income
	// 	# 		@separate_fed_tax = separate_tiers.tier5.base_tax + ((@separate_agi - separate_tiers.tier5.income) * (separate_tiers.tier5.marginal_tax / 100))
	// 	# 	elsif @separate_agi > separate_tiers.tier6.income
	// 	# 		@fed_tax = separate_tiers.tier6.base_tax + ((@separate_agi - separate_tiers.tier6.income) * (separate_tiers.tier6.marginal_tax / 100))
	// 	# 	end	

	// 	# end
	// 	# puts @fed_tax
	// 	# return @fed_tax
	// # end