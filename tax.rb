class Tax

	def initialize(single: nil, joint: nil, separate: nil, single_agi: nil, joint_agi: nil, separate_agi: nil)
		@single = single
		@joint = joint
		@separate = separate
		@single_agi = single_agi
		@joint_agi = joint_agi
		@separate_agi = separate_agi
		@standard_deduction = 6200.00
		@join_deduction = @standard_deduction * 2
		@separate_deduction = @standard_deduction
		@standard_personal_exemption = 3950.00
		@single_pe_threshold = 254200.00
		@joint_pe_threshold = 305050.00
		@separate_pe_threshold = 152525.00

	end

	# def agi_calc

	# end

	def pe_calc
		if @single_agi
			if @single_agi <= @single_pe_threshold
				@personal_exemption = @standard_personal_exemption
			else
				excess = (((@single_agi - @single_pe_threshold) / 2500).ceil) * 2.00
				@personal_exemption = (excess/100) * @standard_personal_exemption
			end

		elsif @joint_agi
			if @joint_agi <= @joint_pe_threshold
				@personal_exemption = (@standard_personal_exemption * 2.00)
			else
				excess = (((@joint_agi - @joint_pe_threshold) / 2500).ceil) * 2.00
				@personal_exemption = (excess/100) * (@standard_personal_exemption * 2.00)
			end

		elsif @separate_agi
			if @separate_agi <= @separate_pe_threshold
				@personal_exemption = @standard_personal_exemption
			else
				excess = (((@separate_agi - @separate_pe_threshold) / 2500).ceil) * 2.00
				@personal_exemption = (excess/100) * @standard_personal_exemption
			end		
		end	

		puts @personal_exemption
		return @personal_exemption		

	end


	def medicare_tax(gross_income)
		@medicare_tax = (1.45/100) * gross_income
		puts @medicare_tax
	end

#gross income threshold x2 when joint?
	def fica_tax(gross_income)
		if gross_income <= 117000
			@fica = (6.20/100) * gross_income
		end

		puts @fica
	end


	def federal_tax

		single_tiers = {
			'tier1': {'income': 406750.00, 'base_tax': 118118.25, 'marginal_tax_rate': 39.60}, 
			'tier2': {'income': 405100.00, 'base_tax': 117541.25, 'marginal_tax_rate': 35.00},
			'tier3': {'income': 186350.00, 'base_tax': 45353.75, 'marginal_tax_rate': 33.00},
			'tier4': {'income': 89350.00, 'base_tax': 18193.74, 'marginal_tax_rate': 28.00},
			'tier5': {'income': 36900.00, 'base_tax': 5081.25 , 'marginal_tax_rate': 25.00},
			'tier6': {'income': 9075.00, 'base_tax': 907.50, 'marginal_tax_rate': 15.00},
			'tier7': {'income': 0.00, 'base_tax': 0.00, 'marginal_tax_rate': 10.00}
		}

		joint_tiers = {
			'tier1': {'income': 457600.00, 'base_tax': 127962.50, 'marginal_tax_rate': 39.60}, 
			'tier2': {'income': 405100.00, 'base_tax': 109587.50, 'marginal_tax_rate': 35.00},
			'tier3': {'income': 226850.00, 'base_tax': 50765.00, 'marginal_tax_rate': 33.00},
			'tier4': {'income': 148850.00, 'base_tax': 28925.00, 'marginal_tax_rate': 28.00},
			'tier5': {'income': 73800.00, 'base_tax': 10162.50 , 'marginal_tax_rate': 25.00},
			'tier6': {'income': 18150.00, 'base_tax': 1815.00, 'marginal_tax_rate': 15.00},
			'tier7': {'income': 0.00, 'base_tax': 0.00, 'marginal_tax_rate': 10.00}
		}

		separate_tiers = {
			'tier1': {'income': 228800.00, 'base_tax': 63981.25, 'marginal_tax_rate': 39.60}, 
			'tier2': {'income': 202550.00, 'base_tax': 54793.75, 'marginal_tax_rate': 35.00},
			'tier3': {'income': 113425.00, 'base_tax': 25382.50, 'marginal_tax_rate': 33.00},
			'tier4': {'income': 74425.00, 'base_tax': 14462.50, 'marginal_tax_rate': 28.00},
			'tier5': {'income': 36900.00, 'base_tax': 5081.25, 'marginal_tax_rate': 25.00},
			'tier6': {'income': 9075.00, 'base_tax': 907.50, 'marginal_tax_rate': 15.00},
			'tier7': {'income': 0.00, 'base_tax': 0.00, 'marginal_tax_rate': 10.00}
		}

		if @single_agi
			single_tiers.each do |key, value|
				if @single_agi > single_tiers[key][:income]
					@fed_tax = single_tiers[key][:base_tax] + ((@single_agi - single_tiers[key][:income]) * (single_tiers[key][:marginal_tax_rate] / 100))
					break
				end
			end

		elsif @joint_agi
			joint_tiers.each do |key, value|
				if @joint_agi > joint_tiers[key][:income]
					@fed_tax = joint_tiers[key][:base_tax] + ((@joint_agi - joint_tiers[key][:income]) * (joint_tiers[key][:marginal_tax_rate] / 100))
					break
				end
			end

		elsif @separate_agi
			separate_tiers.each do |key, value|
				if @separate_agi > separate_tiers[key][:income]
					@fed_tax = separate_tiers[key][:base_tax] + ((@separate_agi - separate_tiers[key][:income]) * (separate_tiers[key][:marginal_tax_rate] / 100))
					break
				end
			end

		end

		
		puts @fed_tax
		return @fed_tax
	end


	def state_tax

		single_tiers = {
			'tier1': {'income': 1029250.00, 'base_tax': 69612.00, 'marginal_tax_rate': 8.82}, 
			'tier2': {'income': 205850.00, 'base_tax': 13209.00, 'marginal_tax_rate': 6.85},
			'tier3': {'income': 77150.00, 'base_tax': 4651.00, 'marginal_tax_rate': 6.65},
			'tier4': {'income': 20550.00, 'base_tax': 1000.00, 'marginal_tax_rate': 6.45},
			'tier5': {'income': 13350.00, 'base_tax': 575.00 , 'marginal_tax_rate': 5.90},
			'tier6': {'income': 11300.00, 'base_tax': 468.00, 'marginal_tax_rate': 5.25},
			'tier7': {'income': 8200.00, 'base_tax': 328.00, 'marginal_tax_rate': 4.50},
			'tier8': {'income': 0.00, 'base_tax': 0.00, 'marginal_tax_rate': 4.00}
		}

		joint_tiers = {
			'tier1': {'income': 2005850.00, 'base_tax': 1372433.00, 'marginal_tax_rate': 8.82}, 
			'tier2': {'income': 308750.00, 'base_tax': 19571.00, 'marginal_tax_rate': 6.85},
			'tier3': {'income': 154350.00, 'base_tax': 9304.00, 'marginal_tax_rate': 6.65},
			'tier4': {'income': 41150.00, 'base_tax': 2002.00, 'marginal_tax_rate': 6.45},
			'tier5': {'income': 26750.00, 'base_tax': 1153.00 , 'marginal_tax_rate': 5.90},
			'tier6': {'income': 22600, 'base_tax': 935, 'marginal_tax_rate': 5.25},
			'tier7': {'income': 16450.00, 'base_tax': 658.00, 'marginal_tax_rate': 4.50},
			'tier8': {'income': 0.00, 'base_tax': 0.00, 'marginal_tax_rate': 4.00}
		}

		separate_tiers = {
			'tier1': {'income': 1029250.00, 'base_tax': 69612.00, 'marginal_tax_rate': 8.82}, 
			'tier2': {'income': 205850.00, 'base_tax': 13209.00, 'marginal_tax_rate': 6.85},
			'tier3': {'income': 77150.00, 'base_tax': 4651.00, 'marginal_tax_rate': 6.65},
			'tier4': {'income': 20550.00, 'base_tax': 1000.00, 'marginal_tax_rate': 6.45},
			'tier5': {'income': 13350.00, 'base_tax': 575.00 , 'marginal_tax_rate': 5.90},
			'tier6': {'income': 11300.00, 'base_tax': 468.00, 'marginal_tax_rate': 5.25},
			'tier7': {'income': 8200.00, 'base_tax': 328.00, 'marginal_tax_rate': 4.50},
			'tier8': {'income': 0.00, 'base_tax': 0.00, 'marginal_tax_rate': 4.00}
		}

		if @single_agi
			single_tiers.each do |key, value|
				if @single_agi > single_tiers[key][:income]
					@ny_tax = single_tiers[key][:base_tax] + ((@single_agi - single_tiers[key][:income]) * (single_tiers[key][:marginal_tax_rate] / 100))
					break
				end
			end

		elsif @joint_agi
			joint_tiers.each do |key, value|
				if @joint_agi > joint_tiers[key][:income]
					@ny_tax = joint_tiers[key][:base_tax] + ((@joint_agi - joint_tiers[key][:income]) * (joint_tiers[key][:marginal_tax_rate] / 100))
					break
				end
			end

		elsif @separate_agi
			separate_tiers.each do |key, value|
				if @separate_agi > separate_tiers[key][:income]
					@ny_tax = separate_tiers[key][:base_tax] + ((@separate_agi - separate_tiers[key][:income]) * (separate_tiers[key][:marginal_tax_rate] / 100))
					break
				end
			end

		end	
		puts @ny_tax
		return @ny_tax		

	end

end


tax1 = Tax.new(single: 200000, single_agi: 189850)
tax1.pe_calc
tax1.federal_tax
tax1.state_tax
tax1.medicare_tax(200000)
# tax1.fica_tax(100000)


#agi entered as parameter becaused based off of many variables (e.g: student loans), and NOT Standard Deduction.