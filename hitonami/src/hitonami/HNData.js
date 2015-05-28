var hn = hn || {};

/**
 * @class Data
 */
function __HNData() {

	this.setZero = function() {
		return this.__hndata._setZero();
	};

	/**
	 * @method clear
	 */
	this.clear = function() {
		return this.__hndata._clear();
	};

	/**
	 * @method equal
	 * @param {hn::HNData}
	 *          arg0
	 * @return {bool}
	 */
	this.equal = function(hndata) {
		if (hndata == null)
			return false;
		return this.__hndata._equal(hndata.__hndata);
	};

	/**
	 * @method getSize
	 * @return {int}
	 */
	this.getSize = function() {
		return this.__hndata._getSize();
	};

	/**
	 * @method isNull
	 * @return {bool}
	 */
	this.isNull = function() {
		return this.__hndata._isNull();
	};

	/**
	 * @method copy
	 * @param {hn::HNData}
	 *          arg0
	 */
	this.copy = function(hndata) {
		return this.__hndata._copy(hndata.__hndata);
	};

	/**
	 * @method toBase64
	 * @return {String}
	 */
	this.toBase64 = function() {
		return this.__hndata._toBase64();
	};

	/**
	 * @method toHex
	 * @return {String}
	 */
	this.toHex = function() {
		return this.__hndata._toHex();
	};

	this.__hndata = new __hn.HNData();

};

hn.Data = __HNData;

/**
 * @method fromHex
 * @param {String}
 *          arg0
 * @return {hn::HNData}
 */
hn.Data.fromHex = function(str) {
	var tmp = __hn.HNData._fromHex(str);
	if (tmp == null)
		return null;
	var ret = new hn.Data();
	ret.__hndata = tmp;
	return ret;
};

/**
 * @method fromFile
 * @param {String}
 *          arg0
 * @return {hn::HNData}
 */
hn.Data.fromFile = function(str) {
	var tmp = __hn.HNData._fromFile(str);
	if (tmp == null)
		return null;
	var ret = new hn.Data();
	ret.__hndata = tmp;
	return ret;
};

/**
 * @method fromBase64
 * @param {String}
 *          arg0
 * @return {hn::HNData}
 */
hn.Data.fromBase64 = function(str) {
	var tmp = __hn.HNData._fromBase64(str);
	if (tmp == null)
		return null;
	var ret = new hn.Data();
	ret.__hndata = tmp;
	return ret;
};
