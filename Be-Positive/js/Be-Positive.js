BloodType = {
  AB_POS: "AB_POS",
  AB_NEG: "AB_NEG",
  A_POS: "A_POS",
  A_NEG: "A_NEG",
  B_POS: "B_POS",
  B_NEG: "B_NEG",
  O_POS: "O_POS",
  O_NEG: "O_NEG"
};

BloodTransfusionRules = {
  /**
   * Set the simulation speed.
   * @type {Number} : Valid values between 1 and 200
   */
  simulation_speed: 200,

  /**
   * returns BloodType, or false to give no BloodType
   *
   * @name receive_patient
   * @param {Bank} blood_inventory
   * @param {Patient} patient
   * @returns {BloodType or false}
   *
   * Patient properties {
   *   gender : String, (MALE,FEMALE)
   *   blood_type : String (BloodType)
   * }
   *
   * Bank properties {
   *   AB_POS : Integer,
   *   AB_NEG : Integer,
   *   A_POS  : Integer,
   *   A_NEG  : Integer,
   *   B_POS  : Integer,
   *   B_NEG  : Integer,
   *   O_POS  : Integer,
   *   O_NEG  : Integer
   * }
   *
   */

  receive_patient: function(blood_inventory, patient) {
    let bt = patient.blood_type;
    let bi = blood_inventory;
    let posArr = ["AB_POS", "AB_NEG", "A_POS", "B_POS", "A_NEG", "B_NEG"];

    let oArr = ["O_POS", "O_NEG"];

    let negArr = ["AB_NEG", "A_NEG", "B_NEG"];

    if (bt.includes("POS") && !bt.includes("O_")) {
      let z = 1;
      if (bt === "A_POS" || bt === "B_POS") {
        z = 2;
      }
      for (
        let i = posArr.indexOf(bt.toString());
        i < posArr.length - 1;
        i += z
      ) {
        if (bi[posArr[i]] > 0) {
          return BloodType[posArr[i]];
        }
      }
    } else if (bt.includes("NEG") && !bt.includes("O_")) {
      let z = 1;
      if (bt === "A_NEG") {
        z = 2;
      }
      for (let i = negArr.indexOf(bt.toString()); i < negArr.length; i += z) {
        if (bi[negArr[i]] > 0) {
          return BloodType[negArr[i]];
        }
      }
    }

    let j = 0;

    if (bt.includes("NEG")) {
      j = 1;
    }
    for (let i = j; i < oArr.length; i++) {
      if (bi[oArr[i]] > 0) {
        return BloodType[oArr[i]];
      }
    }

    return false;
    // give a random blood type to anyone
    // very bad idea!
  }
};
