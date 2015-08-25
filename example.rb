single_tiers = {
	'tier1': {'income': 406750.00, 'base_tax': 118118.25, 'marginal_tax': 39.60}, 
	'tier2': {'income': 405100.00, 'base_tax': 117541.25, 'marginal_tax': 35.00},
	'tier3': {'income': 186350.00, 'base_tax': 45353.75, 'marginal_tax': 33.00},
	'tier4': {'income': 89350.00, 'base_tax': 18193.74, 'marginal_tax': 28.00},
	'tier5': {'income': 36900.00, 'base_tax': 5081.25 , 'marginal_tax': 25.00},
	'tier6': {'income': 9075.00, 'base_tax': 907.50, 'marginal_tax': 15.00}
}


#hard-coded
# if @single_agi
# 	if @single_agi > single_tiers[:tier1][:income]
# 		@fed_tax = single_tiers[:tier1][:base_tax] + ((@single_agi - single_tiers[:tier1][:income]) * (single_tiers[:tier1][:marginal_tax] / 100))
# 	elsif @single_agi > single_tiers[:tier2][:income]
# 		@fed_tax = single_tiers[:tier2][:base_tax] + ((@single_agi - single_tiers[:tier2][:income]) * (single_tiers[:tier2][:marginal_tax] / 100))
# 	elsif @single_agi > single_tiers[:tier3][:income]
# 		@fed_tax = single_tiers[:tier3][:base_tax] + ((@single_agi - single_tiers[:tier3][:income]) * (single_tiers[:tier3][:marginal_tax] / 100))
# 	elsif @single_agi > single_tiers[:tier4][:income]
# 		@fed_tax = single_tiers[:tier4][:base_tax] + ((@single_agi - single_tiers[:tier4][:income]) * (single_tiers[:tier4][:marginal_tax] / 100))
# 	elsif @single_agi > single_tiers[:tier5][:income]
# 		@fed_tax = single_tiers[:tier5][:base_tax] + ((@single_agi - single_tiers[:tier5][:income]) * (single_tiers[:tier5][:marginal_tax] / 100))
# 	elsif @single_agi > single_tiers[:tier6][:income]
# 		@fed_tax = single_tiers[:tier6][:base_tax] + ((@single_agi - single_tiers[:tier6][:income]) * (single_tiers[:tier6][:marginal_tax] / 100))
# 	end
# end

@single_agi = 493800

#refactored
if @single_agi
	single_tiers.each do |key, value|
		puts single_tiers[key][:income]
		puts single_tiers[key][:base_tax]
		puts single_tiers[key][:marginal_tax]
		if @single_agi > single_tiers[key][:income]
			puts 'bigger than ' 
			puts single_tiers[key][:income]
			@fed_tax = single_tiers[key][:base_tax] + ((@single_agi - single_tiers[key][:income]) * (single_tiers[key][:marginal_tax] / 100))
			break
		end
	end
	puts 'fed tax is'
	puts @fed_tax
end