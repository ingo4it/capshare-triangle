require File.expand_path('../lib/capshare/triangle/version', __FILE__)

Gem::Specification.new do |s|
  s.name        = 'capshare-triangle'
  s.version     = '1.0.0'
  s.date        = '2015-01-24'
  s.summary     = "Capshare Triangle"
  s.description = "A triangle gem for capshare and 409a"
  s.authors     = ["Jeron Paul"]
  s.email       = 'jeron@capshare.com'
  s.files       = ["lib/capshare-triangle.rb"]
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.files         = `git ls-files`.split("\n")
  s.homepage    = 'http://rubygems.org/gems/capshare-triangle'
  s.license     = 'MIT'
end