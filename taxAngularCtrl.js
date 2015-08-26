var app = angular.module("taxApp", ["chart.js"]);


taxCtrl = function($scope){

    console.log('in da controller');
    $scope.formData = {};
    $scope.fica_cap = 117000;

    $scope.slide = 1;


    $scope.reset = function(){
        $scope.formData = "";
    };

    $scope.totalGrossCalc = function(){
        if (($scope.filingStatus() == 'joint') && $scope.formData.partnerGrossIncome){
            $scope.totalGrossIncome = $scope.formData.grossIncome + $scope.formData.partnerGrossIncome;
        }
        else {
            $scope.totalGrossIncome = $scope.formData.grossIncome;
        };
        return $scope.totalGrossIncome;
    };
    

    $scope.filingStatus = function(){

        if ($scope.formData.filingChoice == 1){
            $scope.formData.filingStatus = 'single';
        }
        else if ($scope.formData.filingChoice == 2){
            $scope.formData.filingStatus = 'joint';
        }

        else if ($scope.formData.filingChoice == 3){
            $scope.formData.filingStatus = 'separate';
        }

        return $scope.formData.filingStatus;
    };


    $scope.stateCalc = function(){
        if ($scope.formData.state == true){
            $scope.state = 'NYC';
        }
        return $scope.state;
    };


    $scope.peCalc = function(agi, filing_status, partner_agi){
        standard_personal_exemption = 3950.00;
        single_pe_threshold = 254200.00;
        joint_pe_threshold = 305050.00;
        separate_pe_threshold = 152525.00;

        if (agi && filing_status == 'single') {
            if (agi <= single_pe_threshold){
                $scope.personal_exemption = standard_personal_exemption;
            }
            else {
                excess = Math.ceil((agi - single_pe_threshold) / 2500) * 2.00;
                $scope.personal_exemption = (excess/100) * standard_personal_exemption;
            };
        }

        else if (agi && filing_status == 'joint') {
            agi += partner_agi;
            if (agi <= joint_pe_threshold) {
                $scope.personal_exemption = (standard_personal_exemption * 2.00);
            }
            else {
                excess = Math.ceil((agi - joint_pe_threshold) / 2500) * 2.00;
                $scope.personal_exemption = (excess/100) * (standard_personal_exemption * 2.00);
            };
        }

        else if (agi && filing_status == 'separate') {
            if (agi <= separate_pe_threshold){
                $scope.personal_exemption = standard_personal_exemption;
            }
            else {
                excess = Math.ceil((agi - separate_pe_threshold) / 2500) * 2.00;
                $scope.personal_exemption = (excess/100) * standard_personal_exemption;
            };      
        };  

        return $scope.personal_exemption;      
    };



    $scope.medicare = function(gross_income){
        medicare_tax = (1.45/100) * gross_income;
        return medicare_tax;
    };

    //gross income threshold x2 when joint?
    $scope.fica = function(gross_income){

        if (gross_income <= $scope.fica_cap){
            fica_tax = (6.20/100) * gross_income;
            return fica_tax;
        }
        else {
            fica_tax = ((6.20/100) * $scope.fica_cap);
            return fica_tax;
        };
    };

    $scope.federal_tax = function(agi, filing_status, partner_agi){

        single_tiers = [
            {'income': 406750, 'base_tax': 118118.25, 'marginal_tax_rate': 39.6}, 
            {'income': 405100, 'base_tax': 117541.25, 'marginal_tax_rate': 35},
            {'income': 186350, 'base_tax': 45353.75, 'marginal_tax_rate': 33},
            {'income': 89350, 'base_tax': 18193.74, 'marginal_tax_rate': 28},
            {'income': 36900, 'base_tax': 5081.25 , 'marginal_tax_rate': 25},
            {'income': 9075, 'base_tax': 907.5, 'marginal_tax_rate': 15},
            {'income': 0.00, 'base_tax': 0.00, 'marginal_tax_rate': 10.00}
        ];

        joint_tiers = [
            {'income': 457600, 'base_tax': 127962.5, 'marginal_tax_rate': 39.6}, 
            {'income': 405100, 'base_tax': 109587.5, 'marginal_tax_rate': 35},
            {'income': 226850, 'base_tax': 50765, 'marginal_tax_rate': 33},
            {'income': 148850, 'base_tax': 28925, 'marginal_tax_rate': 28},
            {'income': 73800, 'base_tax': 10162.5 , 'marginal_tax_rate': 25},
            {'income': 18150, 'base_tax': 1815, 'marginal_tax_rate': 15},
            {'income': 0.00, 'base_tax': 0.00, 'marginal_tax_rate_rate': 10.00}
        ];

        separate_tiers = [
            {'income': 228800, 'base_tax': 63981.25, 'marginal_tax_rate': 39.6}, 
            {'income': 202550, 'base_tax': 54793.75, 'marginal_tax_rate': 35},
            {'income': 113425, 'base_tax': 25382.5, 'marginal_tax_rate': 33},
            {'income': 74425, 'base_tax': 14462.5, 'marginal_tax_rate': 28},
            {'income': 36900, 'base_tax': 5081.25, 'marginal_tax_rate': 25},
            {'income': 9075, 'base_tax': 907.5, 'marginal_tax_rate': 15},
            {'income': 0.00, 'base_tax': 0.00, 'marginal_tax_rate': 10.00}
        ];

        if (agi && filing_status == 'single') {
            for (var i=0; i<=(single_tiers.length); i++){
                if (agi > single_tiers[i]['income']){
                    fed_tax = single_tiers[i]['base_tax'] + ((agi - single_tiers[i]['income']) * (single_tiers[i]['marginal_tax_rate'] / 100));
                    return fed_tax;
                };
            };
        }


        else if (agi && filing_status == 'joint') {
            agi += partner_agi;
            for (var i=0; i<=(joint_tiers.length); i++){
                if (agi > joint_tiers[i]['income']){
                    fed_tax = joint_tiers[i]['base_tax'] + ((agi - joint_tiers[i]['income']) * (joint_tiers[i]['marginal_tax_rate'] / 100));
                    return fed_tax;
                };
            };
        }

        else if (agi && filing_status == 'separate') {
            for (var i=0; i<=(separate_tiers.length); i++){
                if (agi > separate_tiers[i]['income']){
                    fed_tax = separate_tiers[i]['base_tax'] + ((agi - separate_tiers[i]['income']) * (separate_tiers[i]['marginal_tax_rate'] / 100));
                    return fed_tax;
                };
            };
        };
    };


    $scope.state_tax = function(agi, filing_status, partner_agi){

        state = $scope.stateCalc();
        if (state != 'NYC'){
            return 'Only NYC state tax can be calculated at the moment.';
        };

        single_tiers = [
            {'income': 1029250.00, 'base_tax': 69612.00, 'marginal_tax_rate': 8.82}, 
            {'income': 205850.00, 'base_tax': 13209.00, 'marginal_tax_rate': 6.85},
            {'income': 77150.00, 'base_tax': 4651.00, 'marginal_tax_rate': 6.65},
            {'income': 20550.00, 'base_tax': 1000.00, 'marginal_tax_rate': 6.45},
            {'income': 13350.00, 'base_tax': 575.00 , 'marginal_tax_rate': 5.90},
            {'income': 11300.00, 'base_tax': 468.00, 'marginal_tax_rate': 5.25},
            {'income': 8200.00, 'base_tax': 328.00, 'marginal_tax_rate': 4.50},
            {'income': 0.00, 'base_tax': 0.00, 'marginal_tax_rate': 4.00}
        ];

        joint_tiers = [
            {'income': 2005850.00, 'base_tax': 1372433.00, 'marginal_tax_rate': 8.82}, 
            {'income': 308750.00, 'base_tax': 19571.00, 'marginal_tax_rate': 6.85},
            {'income': 154350.00, 'base_tax': 9304.00, 'marginal_tax_rate': 6.65},
            {'income': 41150.00, 'base_tax': 2002.00, 'marginal_tax_rate': 6.45},
            {'income': 26750.00, 'base_tax': 1153.00 , 'marginal_tax_rate': 5.90},
            {'income': 22600, 'base_tax': 935, 'marginal_tax_rate': 5.25},
            {'income': 16450.00, 'base_tax': 658.00, 'marginal_tax_rate': 4.50},
            {'income': 0.00, 'base_tax': 0.00, 'marginal_tax_rate': 4.00}
        ];

        separate_tiers = [
            {'income': 1029250.00, 'base_tax': 69612.00, 'marginal_tax_rate': 8.82}, 
            {'income': 205850.00, 'base_tax': 13209.00, 'marginal_tax_rate': 6.85},
            {'income': 77150.00, 'base_tax': 4651.00, 'marginal_tax_rate': 6.65},
            {'income': 20550.00, 'base_tax': 1000.00, 'marginal_tax_rate': 6.45},
            {'income': 13350.00, 'base_tax': 575.00 , 'marginal_tax_rate': 5.90},
            {'income': 11300.00, 'base_tax': 468.00, 'marginal_tax_rate': 5.25},
            {'income': 8200.00, 'base_tax': 328.00, 'marginal_tax_rate': 4.50},
            {'income': 0.00, 'base_tax': 0.00, 'marginal_tax_rate': 4.00}
        ];

        if (agi && filing_status == 'single') {
            for (var i=0; i<=(single_tiers.length); i++){
                if (agi > single_tiers[i]['income']){
                    ny_tax = single_tiers[i]['base_tax'] + ((agi - single_tiers[i]['income']) * (single_tiers[i]['marginal_tax_rate'] / 100));
                    return ny_tax;
                };
            };
        }


        else if (agi && filing_status == 'joint') {
            agi += partner_agi;
            for (var i=0; i<=(joint_tiers.length); i++){
                if (agi > joint_tiers[i]['income']){
                    ny_tax = joint_tiers[i]['base_tax'] + ((agi - joint_tiers[i]['income']) * (joint_tiers[i]['marginal_tax_rate'] / 100));
                    return ny_tax;
                };
            };
        }

        else if (agi && filing_status == 'separate') {
            for (var i=0; i<=(separate_tiers.length); i++){
                if (agi > separate_tiers[i]['income']){
                    ny_tax = separate_tiers[i]['base_tax'] + ((agi - separate_tiers[i]['income']) * (separate_tiers[i]['marginal_tax_rate'] / 100));
                    return ny_tax;
                };
            };
        };  

    };  


    $scope.calculateTax = function(){

        $scope.modalShown = false;
        $scope.showResultsTable = true;


        $scope.federalTax = $scope.federal_tax($scope.formData.agi, $scope.filingStatus(), $scope.formData.partnerAgi);
        $scope.stateTax = $scope.state_tax($scope.formData.agi, $scope.filingStatus(), $scope.formData.partnerAgi);
        $scope.medicareTax = $scope.medicare($scope.totalGrossCalc());
        $scope.ficaTax = $scope.fica($scope.totalGrossCalc());
        $scope.exemption = $scope.peCalc($scope.formData.agi, $scope.filingStatus(), $scope.formData.partnerAgi);
        $scope.postTaxIncome = $scope.totalGrossCalc()- $scope.federalTax - $scope.stateTax - $scope.medicareTax - $scope.ficaTax

        if (($scope.filingStatus() == 'joint') && $scope.formData.partnerGrossIncome){
            $scope.eachJointFed = $scope.federalTax / 2;
            $scope.eachJointState = $scope.stateTax / 2;
            $scope.eachJointMedi = $scope.medicareTax / 2;
            $scope.eachJointFica = $scope.ficaTax / 2;
            $scope.eachJointExemption = $scope.exemption / 2;
            $scope.eachJointPost = $scope.postTaxIncome / 2;
        };

        

        $scope.data.push($scope.federalTax);
        $scope.data.push($scope.stateTax);
        $scope.data.push($scope.medicareTax);
        $scope.data.push($scope.ficaTax);
        $scope.data.push($scope.postTaxIncome);


        // console.log('Federal Tax is ');
        // console.log($scope.federalTax);
        // console.log('State Tax is ');
        // console.log($scope.stateTax);
        // console.log('Medicare Tax is ');
        // console.log($scope.medicareTax);
        // console.log('FICA Tax is ');
        // console.log($scope.ficaTax);
        // console.log('Personal Exemption Tax is ');
        // console.log($scope.exemption);
        // console.log('Post-Tax Income is ');
        // console.log($scope.postTaxIncome);

    };

    $scope.labels = ["Federal", "State", "Medicare", "FICA", "Post-Tax Income"];

    $scope.data = [];

    $scope.legend = ["this is a legend"];


    $scope.modalShown = false;

    $scope.toggleModal = function() {
        $scope.modalShown = !$scope.modalShown;
        $scope.slide = 1;
     };

    $scope.nextModal = function(){
        if ($scope.slide == 6){
            $scope.slide = 1;
        };
        $scope.slide += 1;
    };
  }



 app.controller("TaxCtrl", ['$scope', taxCtrl] );


 app.directive('modalDialog', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, 
    transclude: true, 
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      // if (attrs.width)
      //   scope.dialogStyle.width = attrs.width;
      // if (attrs.height)
      //   scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
  };
});















 