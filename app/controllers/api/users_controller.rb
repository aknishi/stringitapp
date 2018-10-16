class Api::UsersController < ApplicationController
  before_action :require_login, only: [:index, :show]
  before_action :authorize_admin, only: :create

  def index
    @users = User.all_customers
  end

  def create
    @user = User.new(user_params)

    if @user.save
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
  end

  private

  def user_params
    params.require(:user).permit(:email, :name, :password, :phone_number, :address, :comment)
  end

  def authorize_admin
    return unless !current_user.admin?
    render json: ["Admin required"]
  end
end
