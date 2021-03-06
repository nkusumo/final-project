Rails.application.routes.draw do
  
  resources :logs, only: [:index, :create]
  resources :parenthoods, only: [:create, :update, :destroy]
  # resources :plants
  resources :users, only: [:create, :show]

  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/current_user", to: "sessions#user"
  get "/users/:id/plants", to: "users#my_plants"
  get "users/:id/waterings", to: "users#my_waterings"
  post 'rails/active_storage/direct_uploads', to: 'direct_uploads#create'
  put '/parenthoods/:id/attach_image', to: 'parenthoods#add_image'
  put '/logs/:id/attach_image', to: 'logs#add_image'

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
