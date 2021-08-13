Rails.application.routes.draw do
  
  resources :logs, only: [:index]
  resources :parenthoods, only: [:index, :show, :create]
  resources :plants
  resources :users, only: [:create]

  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/current_user", to: "sessions#user"
  get "/users/:id/plants", to: "users#my_plants"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
