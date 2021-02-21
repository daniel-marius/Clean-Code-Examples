type Purchase = any;

let Logistics: any;

interface Delivery {
  deliverProduct(): void;
  trackProduct(): void;
}

class DeliveryImplementation {
  protected purchase: Purchase;

  constructor(purchase: Purchase) {
    this.purchase = purchase;
  }

  deliverProduct() {
    if (this.purchase.deliveryType === "express") {
      Logistics.issueExpressDelivery(this.purchase.product);
    } else if (this.purchase.deliveryType === "insured") {
      Logistics.issueInsuredDelivery(this.purchase.product);
    } else {
      Logistics.issueStandardDelivery(this.purchase.product);
    }
  }

  trackProduct() {
    if (this.purchase.deliveryType === "express") {
      Logistics.trackExpressDelivery(this.purchase.product);
    } else if (this.purchase.deliveryType === "insured") {
      Logistics.trackInsuredDelivery(this.purchase.product);
    } else {
      Logistics.trackStandardDelivery(this.purchase.product);
    }
  }
}

class ExpressDelivery extends DeliveryImplementation implements Delivery {
  deliverProduct() {
    Logistics.issueExpressDelivery(this.purchase.product);
  }

  trackProduct() {
    Logistics.trackExpressDelivery(this.purchase.product);
  }
}

class InsuredDelivery extends DeliveryImplementation implements Delivery {
  deliverProduct() {
    Logistics.issueInsuredDelivery(this.purchase.product);
  }

  trackProduct() {
    Logistics.trackInsuredDelivery(this.purchase.product);
  }
}

class StandardDelivey extends DeliveryImplementation implements Delivery {
  deliverProduct() {
    Logistics.issueStandardDelivery(this.purchase.product);
  }

  trackProduct() {
    Logistics.trackStandardDelivery(this.purchase.product);
  }
}

function createDelivery(purchase: any) {
  if (purchase.deliveryType === "express") {
    delivery = new ExpressDelivery(purchase);
  } else if (purchase.deliveryType === "insured") {
    delivery = new InsuredDelivery(purchase);
  } else {
    delivery = new StandardDelivey(purchase);
  }
  return delivery;
}

let delivery: Delivery = createDelivery({});

delivery.deliverProduct();
