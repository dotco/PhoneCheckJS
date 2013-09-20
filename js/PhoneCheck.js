var PhoneCheck = function (cellEl, cellCountrycodeEl){
	this.cellEl = cellEl;
	this.cellCountrycodeEl = cellCountrycodeEl;

	this.setEventListeners();
	this.phoneLib = i18n.phonenumbers.PhoneNumberUtil.getInstance();
	this.setPlaceholder();
}

PhoneCheck.prototype.setEventListeners = function(){
	$(this.cellEl).on('keyup', $.proxy(this.validate, this));
	$(this.cellCountrycodeEl).on('change', $.proxy(this.setPlaceholder, this));
}

PhoneCheck.prototype.getExample = function(){

	var example = this.phoneLib.getExampleNumberForType(this.country(), i18n.phonenumbers.PhoneNumberType.MOBILE);

	if(example && example.values_)
		console.log(example);
		return example.values_;
	return false;
}

PhoneCheck.prototype.validate = function(evt){
	var formattedPhone, naiveCountryForNumber;
	this.countryCode = this.cellCountrycodeEl.val();

	// Check if field is empty/default
	if(this.cell() == this.cellEl.data('countryCode')){
		console.log('only country code entered');
		this.makeFieldValid();
		return;
	} else if(this.cell().length < this.cellEl.data('countryCode').length){
		console.log('needs placeholder to be set');
		this.makeFieldValid();
		this.setPlaceholder();
		return;

	}
	// Check if only valid characters exist
	 else if(!this.isValidChars(evt)){
		this.makeFieldValid(false);
		return;
	}

	formattedPhone = formatE164(this.country(), cleanPhone(this.cell()));
	console.log(formattedPhone);

	// Get the library's guess at country for the number
	naiveCountryForNumber = countryForE164Number(formattedPhone);
	console.log(naiveCountryForNumber);

	try {

		var numberProto = this.phoneLib.parse(this.cell().replace(/[^0-9]/,''), this.country());
		console.log(numberProto);

		if (this.country().toLowerCase() === naiveCountryForNumber.toLowerCase()
			&& this.phoneLib.isValidNumber(numberProto)
		) {
			this.makeFieldValid(true);
			return;
		}

	} catch (e) {
		console.log(e);
		// this.makeFieldValid(false);
	}
	// Ultimately wasn't validated
	this.makeFieldValid(false);
	return false;
}

PhoneCheck.prototype.checkFormat = function(){
	var cur_country_code = this.sanitizedCountryCode();

	countryCodePattern = new RegExp('^' + cur_country_code);

	if(countryCodePattern.test(this.cell())){
		return;
	} else {
		this.cellEl.val(this.cellEl.data('countryCode') + this.cell());
	}
}

PhoneCheck.prototype.sanitizedCountryCode = function(){
	var countryCode;

	return this.cellEl.data('countryCode').replace(/\s/g, '\\s').replace(/\+/g,'\\+');


}

PhoneCheck.prototype.setPlaceholder = function(){
	var example = this.getExample(),
		countryCode = '+ ';

	console.log(example);

	if(example){
		countryCode += example['1'] + ' ';
	}

	this.cellEl.data('countryCode', countryCode);
	this.cellEl.val(countryCode);
	this.validate();
}

PhoneCheck.prototype.cell = function(){
	return this.cellEl.val();
}

PhoneCheck.prototype.country = function(){
	return this.cellCountrycodeEl.val();
}

PhoneCheck.prototype.isValidChars = function(evt){
	var invalidPattern = /[^0-9\(\)\-\+\s]/g;

	if(invalidPattern.test(this.cellEl.val())){
		return false;
	}
	else
	{
		return true;
	}
}

PhoneCheck.prototype.makeFieldValid = function(isValid){
	if(isValid == true){
		this.cellEl.addClass('valid');
		this.cellEl.removeClass('invalid');
	} else if(isValid == false) {
		this.cellEl.addClass('invalid');
		this.cellEl.removeClass('valid');
	} else {
		this.cellEl.removeClass('valid invalid');
	}
}