class Api::OrderLinesController < ApplicationController
  before_action :require_login

  def index
    sleep 0.5
    @order_lines = Order.find(params[:order_id]).order_lines
  end

  def create
    @order_line = OrderLine.new(order_line_params)

    if @order_line.save
      render "api/order_lines/show"
    else
      render json: @order_line.errors.full_messages, status: 422
    end
  end

  def show
    @order_line = OrderLine.find(params[:id])
  end

  def update
    @order_line = OrderLine.find(params[:id])
    if @order_line.update(order_line_params)
      render :show
    else
      render json: @order_line.errors.full_messages, status: 422
    end
  end

  def destroy
    @order_line = OrderLine.find(params[:id])
    @order_line.destroy
  end

  private

  def order_line_params
    params.require(:order_line).permit(:order_id, :racket_id, :main_cord_id, :main_tension, :cross_cord_id, :cross_tension)
  end
end
