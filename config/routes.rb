Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_pages#root'
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :index, :update, :show, :destroy]
    resources :orders, only: [:create, :index, :update, :show, :destroy] do
      resources :order_lines, only: [:create, :index]
    end
    resources :order_lines, only: [:update, :destroy]
    resources :rackets, only: [:create, :index, :update, :show, :destroy]
    resources :cords, only: [:create, :index, :update, :show, :destroy]
    resource :session, only: [:create, :destroy]
  end
end
