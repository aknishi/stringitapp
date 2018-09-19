class Api::CordsController < ApplicationController
  before_action :require_login

  def index
    @cords = Cord.all
  end

  def create
    @cord = Cord.new(cord_params)

    if @cord.save
      login(@cord)
      render "api/cords/show"
    else
      render json: @cord.errors.full_messages, status: 422
    end
  end

  def show
    @cord = Cord.find(params[:id])
  end

  def update
    @cord = Cord.find(params[:id])
    if @cord.update(cord_params)
      render :show
    else
      render json: @cord.errors.full_messages, status: 422
    end
  end

  def destroy
    @cord = Cord.find(params[:id])
    @cord.destroy
  end

  private

  def cord_params
    params.require(:cord).permit(:order_line_id, :brand, :model, :gauge, :composition, :length, :color)
  end
end
