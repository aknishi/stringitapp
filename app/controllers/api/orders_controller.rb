class Api::OrdersController < ApplicationController
  before_action :require_login

  def index
    @orders = Order.all
  end

  def create
    @order = Order.new(order_params)

    if @order.save
      render "api/orders/show"
    else
      render json: @order.errors.full_messages, status: 422
    end
  end

  def show
    @order = Order.find(params[:id])
  end

  def update
    sleep 1
    @order = Order.find(params[:id])
    if @order.update(order_params)
      if @order.status == "Ready"
         PickupMailer.with(user: @order.customer).pickup_email.deliver_now
       end
      render :show
    else
      render json: @order.errors.full_messages, status: 422
    end
  end

  def destroy
    @order = Order.find(params[:id])
    @order.destroy
  end

  private

  def order_params
    params.require(:order).permit(:customer_id, :status, :comments)
  end
end
